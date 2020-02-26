import { filterComics } from './filter.js'
import { renderOverview, renderDetail } from './render.js'

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