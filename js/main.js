"use strict";
let movieArray = ''
init();

function init() {

    let url = "https://equal-factual-wallet.glitch.me/movies";


    function renderMoviePosters() {
        let movieArray = [];
        let loader = `<div class="loading"><img src="../img/ben-redblock-loading.gif"></div>`;
        $("#movie-container").html(loader);
        fetch(url)
            .then(resp => resp.json())
            .then(movies => {
                console.log(movies);
                movieArray = movies;
                let htmlStr = "";
                let html = "";
                // begin render card function
                for (let movie of movies) {

                    //language=HTML
                    //creates the dropdown menus for select
                    html += `<option value=${movie.id}></option> 
                    <div class="posters container-movie-cards">
                        <div class="card-img" style="background-image: url(${movie.poster})">
                            <h1 class="title">${movie.title}</h1>
                            <div class="genre">${movie.genre}</div>
                            <div class="underImgContainer">
                            <div class="director">By: ${movie.director}</div>
                            </div>
                            <div class="description">${movie.plot}</div>
                            <div id="remove-movie">X</div>
                        </div>
                    </div>
                `;

                    //language=HTML
                    //creates movie posters
                    htmlStr = `<div class="posters grow gradient-border modal-add-edit hidden">
                        <div>
                            <h1 class="title">${movie.title}</h1>
                            <div class="genre">${movie.genre}</div>
                            <img src=${movie.poster}>
<!--                            <div class="underImgContainer">-->
                            <div class="director">By: ${movie.director}</div>
                            </div>
                                <div class="description">${movie.plot}</div>
                        </div>
                    </div>`;
                }
// end render card function
                //pushes created card or dropdown menu to the screen
                //
                $("#movie-container").html(html);
                $("#selectMenu").html("<option value='-1' selected>Select a movie</option>" + html);
                $("#selectMenu2").html("<option value='-1' selected>Select a movie</option>" + html);
            });
    }

    renderMoviePosters();

    //when the option selected is changed, update the input fields


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
            .then(renderMoviePosters);
    });

    //create a new movie
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
        fetch(url, postOptions)
            .then(resp => resp.json())
            .then(renderMoviePosters).catch(error => console.log(error))
    });

    // complete
    //delete movie
    let deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };


    $("#selectMenu2").change(function () {
        let inputVal = $(this).val();
        console.log("hello: " + inputVal);
        $("#delete-movie").click(function () {
            //DELETE request
            fetch(`${url}/${inputVal}`, deleteOptions)
                .then(renderMoviePosters);
        });
    });


    $("#selectMenu").change(function () {
            let target = $(this).val()
            console.log(target);

            //grab info from the json file and populate the input fields
            for (let movie of movieArray) {
                if (movie.id == target) {
                    $("#newTitle").val(movie.title);
                    $("#newGenre").val(movie.genre);
                    $("#newRating").val(movie.rating);
                    $("#newDirector").val(movie.director);
                    $("#newPlot").val(movie.plot);
                }
            }
        }
    )

    // BEGIN MODAL ACTIVATE AND CLOSE BUTTONS
    $("#button-add-movie").click(function () {
        $("#modal-add-movie").toggle(".hidden");
        $("#modal-edit-movie").addClass(".hidden");
    })

    $("#button-edit-movie").click(function (event) {
        $("#modal-edit-movie").toggle(".hidden");
        $("#modal-add-movie").addClass(".hidden");
    })

    $(".modal-close").click(function () {
        $(this).parent().parent().toggle(".hidden");
    })



    //end of document ready
}

// )

// $('#newMovie').click(function(){
//     console.log(`clicktest outside`)
// })
