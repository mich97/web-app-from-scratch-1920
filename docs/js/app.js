'use strict';

const PUBLIC_KEY = "?apikey=dbab711d9dd31157460665c92e6ff4e3"
const PRIVATE_KEY = "?apikey=b035ba44c02df1cad1216a27750d4dceb7be6255"
const url = "https://gateway.marvel.com"

const renderHTML = (comics) => {

    return document.getElementById("main").appendChild(comics)

}

const searchComic = () => {
    let input, filter, comicGrid, gridItem, comicTitle, txtValue
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    comicGrid = document.getElementById("comic-layout");
    gridItem = comicGrid.getElementsByClassName("comic-card");

    for (let i = 0; i < gridItem.length; i++) {
        comicTitle = gridItem[i].getElementsByClassName("comic-title")[0];
        txtValue = comicTitle.textContent || comicTitle.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            gridItem[i].style.display = "";
        } else {
            gridItem[i].style.display = "none";
        }
    }
}

fetch(url + '/v1/public/comics' + PUBLIC_KEY)
    .then((response) => {

        return response.json()

    })
    .then((res) => {

        console.log(res.data.results)

        const comics = res.data.results
        const comicContainer = document.createElement('div')
        // comicContainer.setAttribute('class', 'comic-layout')
        comicContainer.setAttribute('id', 'comic-layout')

        comics.forEach( comic => {

            const comicCard = document.createElement('div')
            comicCard.setAttribute('class', 'comic-card')

            const comicAnchor = document.createElement('a')
            comicAnchor.setAttribute('href', `#${comic.id}`)

            const comicImage = document.createElement('img')
            const comicImagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            comicImage.setAttribute('class', 'comic-thumbnail')
            comicImage.setAttribute('src', comicImagePath)

            const comicTitle = document.createElement('p')
            comicTitle.setAttribute('class', 'comic-title')
            comicTitle.innerText = comic.title

            comicAnchor.appendChild(comicImage)
            comicAnchor.appendChild(comicTitle)
            comicCard.appendChild(comicAnchor)
            comicContainer.appendChild(comicCard)

            routie(`${comic.id}`, function() {
                console.log(comic.id)
            });


        })
        renderHTML(comicContainer)
    })

const card = document.querySelector('.card')
card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
});