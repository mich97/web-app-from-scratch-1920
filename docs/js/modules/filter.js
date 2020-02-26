function filterComics(data) {
    return data.filter(comic =>
        comic.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
        comic.description !== null)
}

export {
    filterComics
}