import CryptoJS from 'crypto-js';

let key = CryptoJS.enc.Latin1.parse('liuhui1990170626');
let iv = CryptoJS.enc.Latin1.parse('liuhui1990170626');

/**
 * 加密，AES-128-CBC加密模式，key需要为16位，key和iv可以一样
 * @param {*} data 
 */
const encrypt = (data: string) => {
    return CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
}

/**
 * 解密
 * @param {*} data 
 */
const decrypt = (data: string) => {
    let decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
    encrypt,
    decrypt
}
