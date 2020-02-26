import { getOverviewData, getDetailData } from './modules/api.js'

routie({
    '': () => {
        getOverviewData()
    },

    ':id': (id) => {
        getDetailData(id)
    }
})