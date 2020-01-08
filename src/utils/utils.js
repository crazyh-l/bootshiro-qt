import axios from 'axios'
import Qs from 'qs'
const utils = {
    axiosMethod : (config) => {
        axios({
            method: config.method,
            url: config.url,
            params: config.params ? config.params : null,
            data: config.data ? Qs.stringify(config.data) : null
        }).then(config.callback).catch(config.catch ? config.catch : () => {})
    }
}

export default utils