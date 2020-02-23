const PUBLIC_KEY = "dbab711d9dd31157460665c92e6ff4e3"
const url = `https://gateway.marvel.com/v1/public/comics?apikey=${PUBLIC_KEY}`

const init = () => {
    getOverviewData();
}

const getOverviewData = async () => {
    await fetch(url)
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
    comicContainer.setAttribute('class', 'comic-layout');

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

    return document.getElementById("main").appendChild(data);
}

const searchComic = () => {
    /* To do */
}

routie({
    "comic:id": id => {
        console.log("detailpage");
    }
})

init();