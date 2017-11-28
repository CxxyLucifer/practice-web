import 'whatwg-fetch';
import { message } from 'antd';
import objectAssign from 'object-assign';

let Fetch = (param) => {

    let { url, method, body, showMsg } = param;
    let req = {
        method: "GET",
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    if (param && param['body'] && typeof param['body'] == 'object') {
        param['body'] = JSON.stringify(param['body'])
    }

    delete param['url'];
    let option = objectAssign(req, param);

    return new Promise((resolve, reject) => {
        fetch(url, option).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(url, option['body'], res);
            resolve(dispatch(res, showMsg));

        }).catch((err) => {
            message.warning('网络不给力');
            resolve({ res: {}, err: err });
        });
    })
}


function dispatch(res, showMsg): Result {
    const { status, message } = res;

    let dataResult = { err: null, res: {} };
    switch (status) {
        case 1:
            dataResult = { res: res.data, err: null };
            break;
        case -1:
        case -2:
            if (showMsg == 'true') {
                message.warning(message);
            }
            dataResult = { res: res.data, err: new Error('serverError') };
            break;
        case -4:
            if (showMsg == 'true') {
                message.warning(`${message || "网络好像不太好使!"}`);
            }
            dataResult = { res: res.data, err: new Error('serverError') };
            break;
        case -5:
            if (showMsg == 'true') {
                message.warning(`${message || "加班太多,体力跟不上了.(･･;)"}`);
            }
            dataResult = { res: res.data, err: new Error('serverError') };
            break;
        default:
            // 其它异常交给调用者自己外理;
            dataResult = { res: res, err: null };
            break;
    }
    return dataResult;
}