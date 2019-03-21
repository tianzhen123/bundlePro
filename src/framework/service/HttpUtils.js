/** 基于fetch 封装的网络请求工具类 **/

import {Component} from 'react'
import deviceStorage from '../../framework/storage/deviceStorage'


/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let header = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'cookie': ''
}

/**
 * 设置请求超时时间
 * @type {number}
 */
let timeOutMillis = 30000;

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
    if (params) {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    console.log('get url', url)
    return url
}

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch, timeout = timeOutMillis) => {
    let timeoutBlock = () => {
    }
    let timeout_promise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            // 请求超时处理
            reject('timeout promise')
        }
    })

    let abortable_promise = Promise.race([
        original_fetch,
        timeout_promise
    ])

    setTimeout(() => {
        timeoutBlock()
    }, timeout)

    return abortable_promise
}

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {

    /**
     * GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @returns {Promise}
     */
    static getRequest = (url, params = {}) => {
        console.log('get url: ' + url, params, header);
        let getHeader = header;
        getHeader["Content-Type"] = "";
        return deviceStorage.get('cookie').then(value => {
            getHeader['cookie'] = value;
            console.log('request Header: ', getHeader);
            return getHeader;
        }).then(getHeader => {
            return timeoutFetch(fetch(handleUrl(url)(params), {
                method: 'GET',
                headers: getHeader
            }))
        }).then(response => {
            if (response.ok) {
                console.log('response Header: ', response.headers, response.headers.get('set-cookie'));
                return response.json()
            } else {
                return response.json()
            }
        }).then(response => {
            if (response && response.success) {
                console.log('get 返回: ', response);
                return response;
            } else {
                console.log('get 失败: ', response);
                return Promise.reject(response.viewDesc);
            }
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    /**
     * POST 请求
     * @param url 请求的URL
     * @param params 请求参数
     * @returns {Promise}
     */
    static postRequest = (url, params, ...option) => {
        console.log('post url: ' + url);
        header['cookie'] = deviceStorage.get('cookie');
        return timeoutFetch(fetch(url, {
            method: 'POST',
            headers: header,
            body: params
        })).then(response => {
            if (response.ok) {
                if (response.url.includes('login') && response.headers.has('set-cookie')) {
                    deviceStorage.save('cookie', response.headers.get('set-cookie'))
                }
                return response.json();
            } else {
                return response.json();
            }
        }).then(response => {
            if (response && response.success) {
                return response;
            } else {
                console.log('post 失败: ', response);
                return Promise.reject(response.viewDesc);
            }
        }).catch(error => {
            return Promise.reject(error);
        })
    }
}