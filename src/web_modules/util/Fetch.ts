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
const Fetch = (url: string, param?: any) => {
    if (undefined != param && undefined != param.body) {
        param.body = JSON.stringify(param.body)
    }
    let req = {
        method: 'get',
        headers: {
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
                message.warning('请求发生错误，请稍后重试!');
                reject(error);
            })
    })
    return promise
}

/**
 * 处理服务端的异常信息
 * @param data 
 */
const solveMessge = (data: any) => {
    switch (data.status) {
        case 400:       //处理后端实体验证报的message信息
            for (let { defaultMessage } of data.errors) {
                message.warning(defaultMessage);
                break;
            }
            break;
        case 500:       //处理后端通过 throw new Exception("参数异常") 抛的异常
            if (undefined != data.message) {
                message.warning(data.message);
            }
            break;
        default:
            break;
    }
}
export default Fetch;