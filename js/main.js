"use strict";


// VARIABLES
let glitchUrl = 'https://equal-factual-wallet.glitch.me/movies';
let html = "";
let movies;

let omdbUrl = 'https://www.omdbapi.com';
let omdbData;
let omdbTitle;


getDataGlitch();

// getDataOmdb();


function getDataGlitch() {

    fetch(glitchUrl)
        .then((response) => response.json())
        .then()
        .then((glitchData) => {

            console.log(glitchData);

            movies = document.querySelector(".list");


            glitchData.forEach(function (movie) {

                // returnreturn - poster is commented out because of errors when value is empty
                //language=HTML
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

                // loading message disabled / not visible
                document.querySelector('#modal-loading').classList.add('hidden');

            })
        });
}


function addMovie() {

}

function editMovie() {

}

function rmMovie() {

}

// BEGIN GET OMDB
function getDataOmdb() {
    fetch(`${omdbUrl}/?apikey=${OMDB_KEY}&t=${omdbTitle}`)
        .then((response) => response.json())
        .then((omdbData) => {
            console.log(omdbData);
        });
}


// anthony work
// addmovie function
$(document).ready(function() {
    let movieArray = [];
    let url = "https://equal-factual-wallet.glitch.me/movies";
    const moviePosters = () => {
        let loader = `<div class="loading"><img src="img/loading.gif"></div>`;
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
                    htmlStr += `<div class="posters grow gradient-border"><div>`
                    htmlStr += `<h1 class="title">${movie.title}</h1><div class="genre">${movie.genre}</div><img src=${movie.poster}>`;
                    htmlStr += `<div class="underImgContainer"><div class="rating">${createStars(movie)}</div><div class="director">By: ${movie.director}</div></div>`;
                    htmlStr += `<div class="description">${movie.plot}</div>`;
                    htmlStr += `</div></div>`;
                }

                //pushes created card or dropdown menu to the screen
                console.log(movies)
                $("#container").html(htmlStr);
                $("#selectMenu").html("<option value='-1' selected>Select a movie</option>" + html);
                $("#selectMenu2").html("<option value='-1' selected>Select a movie</option>" + html);
            });
    }
    moviePosters();
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