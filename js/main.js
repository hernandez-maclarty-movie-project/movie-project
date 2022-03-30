"use strict";


// VARIABLES
let glitchUrl = 'https://equal-factual-wallet.glitch.me/movies';
let html = "";
let movies;

let omdbUrl = 'https://www.omdbapi.com';
let omdbTitle;


getDataGlitch();
// getDataOmdb();


function getDataGlitch() {
    fetch(glitchUrl)
        .then((response) => response.json())
        .then((glitchData) => {

            console.log(glitchData);

            movies = document.querySelector(".list");

            glitchData.forEach(function (movie) {

                //language=HTML
                html =
                    `
                        <div>Title: ${movie.title}</div>
                    `
                movies.innerHTML += html;

            })
        });
}


function addMovie() {

}

function editMovie() {

}

function rmMovie() {

}


function getDataOmdb() {
    fetch(`${omdbUrl}/?apikey=${OMDB_KEY}&t=${omdbTitle}`)
        .then((response) => response.json())
        .then((omdgData) => {
            console.log(omdbData);
        });
}


