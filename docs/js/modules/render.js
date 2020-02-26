const renderOverview = (data) => {
    const comicContainer = document.createElement('div')
    const main = document.getElementById("main").appendChild(comicContainer)

    comicContainer.setAttribute('id', 'comic-overview')

    data.forEach(comic => {

        const comicCard = document.createElement('a')
        comicCard.setAttribute('href', `#${comic.id}`)
        comicCard.setAttribute('class', 'comic-card')

        const comicImage = document.createElement('img')
        const comicImagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        comicImage.setAttribute('class', 'comic-thumbnail')
        comicImage.setAttribute('src', comicImagePath)

        const comicTitle = document.createElement('h5')
        comicTitle.setAttribute('class', 'comic-title')
        comicTitle.innerText = comic.title

        comicCard.appendChild(comicImage)
        comicCard.appendChild(comicTitle)
        comicContainer.appendChild(comicCard)

    })

    return main
}

const renderDetail = (data) => {
    let detail, directives
    const comic = data[0]
    const comicOverview = document.getElementById('comic-overview')
    const detailContainer = document.getElementById('detail-container')

    detail = {
        path: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        'detail-title': comic.title,
        'detail-description': comic.description
    };

    directives = {
        'detail-thumbnail': {
            src: function() {
                return this.path;
            }
        }
    };

    comicOverview.classList.add('hidden')
    detailContainer.classList.remove('hidden')
    Transparency.render(document.getElementById('detail-container'), detail, directives)

}