import { filterComics } from './filter.js'
import { renderOverview, renderDetail } from './render.js'

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