import { getOverviewData, getDetailData } from './api.js'

const routeHandler = () => {
    routie({
        '': () => {
            getOverviewData()
        },

        ':id': (id) => {
            getDetailData(id)
        }
    })
}

export {
    routeHandler
}