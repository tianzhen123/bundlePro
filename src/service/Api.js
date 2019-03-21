/**
 * Api 请求
 */
import HttpUtils from '../service/HttpUtils';
import React, {Component} from 'react';

const baseUrl = 'https://gateway.msorg.cn';

export default class FetchRequest extends Component {

    /**
     * 登录请求
     * @param username 用户名
     * @param password 密码
     * @returns {Promise}
     */
    static login(username, password) {
        console.log('api', 'login', username, password);
        let url = baseUrl + '/usermvp/login';
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        return HttpUtils.postRequest(url, formData);
    }

    /**
     * 获取用户列表
     * @param pageNum
     * @param pageSize
     * @returns {Promise}
     */
    static users(pageNum, pageSize) {
        let url = baseUrl + '/usermvp/users';
        return HttpUtils.getRequest(url, {pageNum: pageNum, pageSize: pageSize});
    }
}