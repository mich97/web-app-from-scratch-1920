'use strict';

const PUBLIC_KEY = "?apikey=dbab711d9dd31157460665c92e6ff4e3"
const PRIVATE_KEY = "?apikey=b035ba44c02df1cad1216a27750d4dceb7be6255"
const url = "https://gateway.marvel.com"

const renderComics = (comics) => {

    return document.getElementById("main").appendChild(comics)

}


fetch(url + '/v1/public/comics' + PUBLIC_KEY)
    .then((response) => {

        return response.json()

    })
    .then((res) => {

        console.log(res.data.results)

        const comics = res.data.results
        const list = document.createElement('ul')

        comics.forEach( comic => {

            const listItem = document.createElement('li')
            listItem.innerText = comic.title
            list.appendChild(listItem)

        })
        renderComics(list)
    })

