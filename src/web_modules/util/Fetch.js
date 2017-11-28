import 'whatwg-fetch';
import { message } from 'antd';
import objectAssign from 'object-assign';

export default function Fetch(url, options) {
    if (undefined != options && undefined != options.body) {
        options.body = JSON.stringify(options.body)
    }
    let req = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const defer = new Promise((resolve, reject) => {
        fetch(url, objectAssign(req, options))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    var error = new Error(response.statusText)
                    error.response = response
                    // throw error
                    message.warning('请求发生错误:' + error)
                }
            })
            .then(data => {
                resolve(data) //返回成功数据
            })
            .catch(error => {
                console.log(error.message)
                reject()
            })
    })
    return defer
}