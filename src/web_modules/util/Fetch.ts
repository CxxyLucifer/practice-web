import 'whatwg-fetch';
import { message } from 'antd';
import objectAssign from 'object-assign';

const myStorage = window.sessionStorage;

/**
 * fetch请求工具类
 * 
 * @author liuhui
 * @param {*} url 
 * @param {*} param 
 */
const Fetch = (url: string, param?: any) => {

    if (param && param['body'] && typeof param['body'] == 'object') {
        param['body'] = JSON.stringify(param['body']);
    }

    let Platform = 'pc';
    let req = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Platform': Platform,
            'Authorization': myStorage.getItem('jwt_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    const promise = new Promise((resolve, reject) => {
        let success: boolean;
        fetch(url, objectAssign(req, param))
            .then(response => {
                if (response.ok) {
                    success = true;
                } else {
                    success = false;
                }
                return response.json();
            })
            .then(json => {
                if (__DEV__) {
                    console.log('\n', '---------- fetch url:', url)
                    param && console.log('----------- fetch param:', JSON.stringify(param))
                    console.log('----------- fetch success:', success)
                    console.log('----------- fetch result:', json)
                }
                if (success) {
                    solveAuth(json);
                    resolve(json);
                } else {
                    solveMessge(json);
                    reject(json);
                }
            })
            .catch(error => {
                message.warning('请求失败，请稍后重试');
                reject(error);
            })
    })
    return promise
}

/**
 * 处理异常信息
 * @param data 
 */
const solveMessge = (data: any) => {
    let { status } = data;
    switch (status) {
        case 400:       //1、服务端实体验证报的message信息
            for (let { defaultMessage } of data.errors) {
                message.warning(defaultMessage);
                break;
            }
            break;
        case 500:       //1、throw new CommonException("参数异常")抛的异常 2、其他异常
            if (undefined != data.message) {
                message.warning(data.message);
            }
            break;
        default:
            if (undefined != data.message) {
                message.warning(data.message);
            }
            break;
    }
}

/**
 * 
 * @param json 
 */
const solveAuth = (json: any) => {
    //登录保存jwt_token至sessionStorage
    if (json.data && json.data.token) {
        myStorage.setItem('jwt_token', json.data.token);
    }
    //非法请求，跳转至登录页
    if (json.notAuth) {
        let myWindow: any = window;
        myWindow.location = "http://127.0.0.1:8088/#/login";
    }
}

export default Fetch;