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
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
                return response.json()
            })
            .then(data => {
                if (success) {
                    resolve(data)
                } else {
                    solveMessge(data);
                    reject(data);
                }
            })
            .catch(error => {
                message.warning('请求发生错误，稍后重试!');
                reject(error);
            })
    })
    return promise
}


function solveMessge(data: any) {
    switch (data.status) {
        //处理后端实体验证报的message信息
        case 400:
            for (let { defaultMessage } of data.errors) {
                message.warning(defaultMessage);
                break;
            }
            break;
        //处理后端通过 throw new Exception("参数异常") 抛的异常
        case 500:
            message.warning(data.message);
            break;
        default:
            break;
    }
}