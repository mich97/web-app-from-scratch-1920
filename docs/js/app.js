const PUBLIC_KEY = 'apikey=dbab711d9dd31157460665c92e6ff4e3'
const urlBase = `https://gateway.marvel.com`
const urlCategoryComics = `/v1/public/comics`
const filter = '?orderBy=modified&limit=100'

const getOverviewData = async () => {
    await fetch(`${urlBase}${urlCategoryComics}${filter}&${PUBLIC_KEY}`)
        .then((response) => {
            return response.json()
        })
        .then((myjson) => {
            console.log(myjson.data.results)
            const comics = myjson.data.results
            const filteredComics = filterComics(comics)

            renderOverview(filteredComics)
        })
}

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

const getDetailData = async (id) => {
    await fetch(`${urlBase}${urlCategoryComics}/${id}?${PUBLIC_KEY}`)
        .then((response) => {
            return response.json()
        })
        .then((myjson) => {
            const detail = myjson.data.results
            renderDetail(detail)
        })
}

const renderDetail = (data) => {
    let detail, directives
    const comic = data[0]
    const comicOverview = document.getElementById('comic-overview')
    const detailContainer = document.getElementById('detail-container')
    const creators = comic.creators.items

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

function filterComics(data) {
    return data.filter(comic =>
        comic.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
        comic.description !== null)
}

routie({
    '': () => {
        getOverviewData()
    },

    ':id': (id) => {
        getDetailData(id)
    }
})