'use strict';

const PUBLIC_KEY = "?apikey=dbab711d9dd31157460665c92e6ff4e3"
const PRIVATE_KEY = "?apikey=b035ba44c02df1cad1216a27750d4dceb7be6255"
const url = "https://gateway.marvel.com"

const renderComics = (comics) => {

    return document.getElementById("main").appendChild(comics)

}

const searchComic = () => {

}

fetch(url + '/v1/public/comics' + PUBLIC_KEY)
    .then((response) => {

        return response.json()

    })
    .then((res) => {

        console.log(res.data.results)

        const comics = res.data.results
        const comicContainer = document.createElement('div')
        comicContainer.setAttribute('class', 'comic-layout')

        comics.forEach( comic => {

            const comicGrid = document.createElement('div')
            comicGrid.setAttribute('class', 'comic-grid')

            const comicImage = document.createElement('img')
            const comicImagePath = comic.thumbnail.path + "." + comic.thumbnail.extension
            comicImage.setAttribute('class', 'comic-thumbnail')
            comicImage.setAttribute('src', comicImagePath)

            const comicTitle = document.createElement('span')
            comicTitle.setAttribute('class', 'comic-title')
            comicTitle.innerText = comic.title

            const comicDescription = document.createElement('span')
            comicDescription.setAttribute('class', 'comic-description')
            comicDescription.innerText = comic.description

            comicGrid.appendChild(comicImage)
            comicGrid.appendChild(comicTitle)
            comicContainer.appendChild(comicGrid)


        })
        renderComics(comicContainer)
    })

