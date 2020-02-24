const PUBLIC_KEY = "apikey=dbab711d9dd31157460665c92e6ff4e3"
const urlBase = `https://gateway.marvel.com`
const urlCategoryComics = `/v1/public/comics`
const filter = '?orderBy=modified'

const init = () => {
    getOverviewData();
}

const getOverviewData = async () => {
    await fetch(`${urlBase}${urlCategoryComics}${filter}&${PUBLIC_KEY}`)
        .then((response) => {
            return response.json();
        })
        .then((myjson) => {
            console.log(myjson.data.results);
            const comics = myjson.data.results;
            renderOverview(comics);
        })
}

const renderOverview = (data) => {
    const comicContainer = document.createElement('div');
    const main = document.getElementById("main").appendChild(comicContainer)

    comicContainer.setAttribute('id', 'comic-overview');

    data.forEach(comic => {

        const comicCard = document.createElement('div');
        comicCard.setAttribute('class', 'comic-card');

        const comicAnchor = document.createElement('a');
        comicAnchor.setAttribute('href', `#${comic.id}`);

        const comicImage = document.createElement('img');
        const comicImagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
        comicImage.setAttribute('class', 'comic-thumbnail');
        comicImage.setAttribute('src', comicImagePath);

        const comicTitle = document.createElement('p');
        comicTitle.setAttribute('class', 'comic-title');
        comicTitle.innerText = comic.title;

        comicAnchor.appendChild(comicImage);
        comicAnchor.appendChild(comicTitle);
        comicCard.appendChild(comicAnchor);
        comicContainer.appendChild(comicCard);

    })

    return main;
}

const getDetailData = async (id) => {
    await fetch(`${urlBase}${urlCategoryComics}/${id}?${PUBLIC_KEY}`)
        .then((response) => {
            return response.json();
        })
        .then((myjson) => {
            const detail = myjson.data.results
            renderDetail(detail);
        })
}

const renderDetail = (data) => {
    const comicOverview = document.getElementById("comic-overview");
    const detailContainer = document.getElementById('detail-container');

    data.forEach(detail => {

        console.log(`${detail.thumbnail.path}.${detail.thumbnail.extension}`)

        const detailTemplate = {
            'detail-title': detail.title,
            'detail-description': detail.description
        }

        Transparency.render(detailContainer, detailTemplate)
        comicOverview.classList.add("hidden");
        detailContainer.classList.remove("hidden");

    })
}

const searchComic = () => {s
    /* To do */
}

routie({
    ':id': (id) => {
        getDetailData(id);
    }
})

init();