import 'whatwg-fetch';
import { message } from 'antd';
import objectAssign from 'object-assign';

/**
 * fetch请求工具类
 * 
 * @author liuhui
 * @param {*} url 
 * @param {*} param 
 */
export default function Fetch(url: string, param?: any) {
    if (undefined != param && undefined != param.body) {
        param.body = JSON.stringify(param.body)
    }
    let req = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const defer = new Promise((resolve, reject) => {
        fetch(url, objectAssign(req, param))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    var error = new Error(response.statusText)
                    // throw error
                    message.warning('请求发生错误:' + error)
                }
            })
            .then(data => {
                resolve(data) //返回成功数据
            })
            .catch(error => {
                message.warning('请求发生错误，请检查您的网络，稍后重试!');
                reject({ err: error });
            })
    })
    return defer
}