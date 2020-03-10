
import axios from 'axios'
import qs from 'qs'
let baseUrl = 'http://192.168.0.145:8080/jeecg-boot'
export function login(parameter){
    return axios({
        method: 'post',
        url: baseUrl + '/sys/login',
        data: parameter
    })
}
// 后台查询队员列表接口
export function queryPageList(name,pageNo){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthlete/queryPageList',
        data: qs.stringify({name,pageNo,pageSize: 10})
    })
}

export function sourceUpload(formData){
    return axios({
        url: baseUrl + '/sys/oss/upload',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: formData
    })
}

export function addItem(params){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthlete/add',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function queryById(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthlete/queryById',
        data: qs.stringify({id})
    })
}

export function deleteItem(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthlete/delete',
        data: qs.stringify({id})
    })
}

export function queryMessage(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangPlayerData/queryById',
        data: qs.stringify({id})
    })
}

export function addMessage(params){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangPlayerData/add',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function addUnionMessage(params){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangPlayerData/edit',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function queryUnionMessage(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAvgData/queryById',
        data: qs.stringify({id})
    })
}

export function queryPointsAMessage(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthleteData/queryByPlayerId',
        data: qs.stringify({id})
    })
}

export function queryPointsBMessage(id){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthleteBeforeData/queryByPlayerId',
        data: qs.stringify({id})
    })
}

export function postPointsAMessage(params){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthleteData/add',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function postPointsBMessage(params){
    return axios({
        method: 'post',
        url: baseUrl + '/dongfangAthleteBeforeData/add',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}