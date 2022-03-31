"use strict";


// VARIABLES
let glitchUrl = 'https://equal-factual-wallet.glitch.me/movies';
let html = "";
let movies;
getDataGlitch();


function getDataGlitch() {

    fetch(glitchUrl)
        .then((response) => response.json())
        .then()
        .then((glitchData) => {

            console.log(glitchData);

            movies = document.querySelector(".list");


            glitchData.forEach(function (movie) {

//                 // returnreturn - poster is commented out because of errors when value is empty
//                 //language=HTML
                html =
                    `
                        <div>Title: ${movie.title}</div>
                        <div>Director: ${movie.director}</div>
                        <div>Genre: ${movie.genre}</div>
                        <div>ID: ${movie.id}</div>
                        <div>Plot: ${movie.plot}</div>
                        <div>Poster: <img src="${movie.poster}" alt="Movie poster for the movie ${movie.title}"></div>
                        <div>Rating: ${movie.rating}</div>
                        <div>Year: ${movie.year}</div>
                    `
                movies.innerHTML += html;
            })
        });
}

// anthony work
// add movie function
$(document).ready(function () {
    let movieArray = [];
    let url = "https://equal-factual-wallet.glitch.me/movies";
    const moviePosters = () => {
        let loader = `<div class="loading"><img src=""></div>`;
        $("#container").html(loader);
        fetch(url)
            .then(resp => resp.json())
            .then(movies => {
                movieArray = movies;
                let htmlStr = "";
                let html = "";
                for (let movie of movies) {

                    //creates the dropdown menus for select
                    html += `<option value=${movie.id}>${movie.title}</option>`;

                    //creates movie posters
                    // htmlStr += `<div class="posters grow gradient-border"><div>`
                    // htmlStr += `<h1 class="title">${movie.title}</h1><div class="genre">${movie.genre}</div><img src=${movie.poster}>`;
                    // htmlStr += `<div class="description">${movie.plot}</div>`;
                    // htmlStr += `</div></div>`;
                }

                //pushes created card or dropdown menu to the screen
                console.log(movies)
                $("#container").html(htmlStr);
                $("#selectMenu").html("<option value='-1' selected>Select a movie</option>" + html);
            });
    }

    moviePosters();
    //Edit selected movie
    $("#changeMovie").click(function () {
        let input = $("#selectMenu").val()
        let insert = {
            title: $("#newTitle").val(),
            genre: $("#newGenre").val(),
            rating: $("#newRating").val(),
            director: $("#newDirector").val(),
            plot: $("#newPlot").val()
        }
        let patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insert)
        }
        //PATCH request
        fetch(`${url}/${input}`, patchOptions)
            .then(moviePosters);
    });

// select menu 1 updating field edit

    $("#selectMenu").change(function () {
        let target = $(this).val()
        console.log(target);

        // grab info from json to  populate fields
        for (let movie of movieArray) {
            if (movie.id == target) {
                $("#newTitle").val(movie.title);
                $("#newGenre").val(movie.genre);
                $("#newRating").val(movie.rating);
                $("#newDirector").val(movie.director);
                $("#newPlot").val(movie.plot);
            }
        }
    });

// End select menu field 1

// Edit movie Function


// Adding new moives

    $('#newMovie').click((e) => {
        e.preventDefault();

        var addMovie = {
            title: $("#title").val(),
            genre: $("#genre").val(),
            rating: $("#rating").val(),
            director: $("#director").val(),
            plot: $("#plot").val()
        }
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addMovie)
        }
        //POST movie
        fetch(glitchUrl, postOptions)
            .then(resp => resp.json())
            .then(moviePosters).catch(error => console.log(error))
    });
});
// end add movie