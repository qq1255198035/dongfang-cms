import axios from "axios";
import { Component } from "react";



// 请求前拦截
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        //console.log(token)
        if (token){
            config.headers[ 'X-Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        console.log(config.method)
        if(config.method === 'get'){
            config.params = {
                _t: Date.parse(new Date())/1000,
                ...config.params
            }
        }
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
axios.interceptors.response.use(
    data => {
        return data.data;
    },
    err => {
        // if (err.response.status === 504 || err.response.status === 404) {
        // console.log("服务器被吃了⊙﹏⊙∥");
        // } else if (err.response.status === 401) {
        // console.log("登录信息失效⊙﹏⊙∥");
        // } else if (err.response.status === 500) {
        // console.log("服务器开小差了⊙﹏⊙∥");
        // }
        console.log(err)
        return Promise.reject(err);
    }
);

const multiple = function(requsetArray, callback) {
    axios.all(requsetArray).then(axios.spread(callback));
};


Component.prototype.multiple = multiple;