import CryptoJS from 'crypto-js';

/**
 * MD5加密
 * @param data 
 */
const MD5 = (data: string) => {
    return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);
}

/**
 * HmacMD5加密
 * @param data 
 */
const HmacMD5 = (data: string, key: string) => {
    return CryptoJS.HmacMD5(data, key).toString(CryptoJS.enc.Hex);;
}

export default {
    MD5,
    HmacMD5
}