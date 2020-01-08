import requset from '@/utils/request'
import Qs from 'qs'

export function login(username, password) {
    return requset({
        url: '/doLogin',
        method: 'post',
        data: Qs.stringify({
            username  : username,
            password : password
        })
    })
}

export function getInfo() {
    return requset({
        url: '/info',
        method: 'get'
    })
}