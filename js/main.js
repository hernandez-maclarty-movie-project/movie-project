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


