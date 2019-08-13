import { JSEncrypt } from 'jsencrypt';
import { Base64 } from 'js-base64';

/**
 * 甲方构建密钥对儿，将公钥公布给乙方，将私钥保留。
 * 甲方使用私钥加密数据，然后用私钥对加密后的数据签名，发送给乙方签名以及加密后的数据；乙方使用公钥、签名来验证待解密数据是否有效，如果有效使用公钥对数据解密。
 * 乙方使用公钥加密数据，向甲方发送经过加密后的数据；甲方获得加密数据，通过私钥解密。
 */
let encrypt:any;

 
/**
 * 获取私钥
 */
const getPrivateKey = () =>{
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    return encrypt.getPrivateKeyB64();
}

/**
 * 获取公钥
 */
const getPublicKey = () => {
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    return encrypt.getPublicKeyB64();
}


/**
 * 公钥加密
 * @param content  内容
 * @param publicKey  公钥
 */
const encryptByPublicKey = (content:string,publicKey:string)=> {
    if (!encrypt){
        encrypt = new JSEncrypt();
    }
    encrypt.setPublicKey(publicKey);
    return encodeURI(encrypt.encrypt(content));
}

/**
 * 私钥加密
 * @param content  内容
 * @param privateKey  私钥
 */
const encryptByPrivateKey = (content: string, privateKey: string) => {
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    encrypt.setPrivateKey(privateKey);
    return encodeURI(encrypt.encrypt(content));
}


/**
 * 公钥解密
 * @param content  内容
 * @param publicKey  公钥
 */
const decryptByPublicKey = (content: string, publicKey: string) => {
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    encrypt.setPublicKey(publicKey);
    return encrypt.decrypt(content);
}


/**
 * 私钥解密
 * @param content  内容
 * @param privateKey  私钥
 */
const decryptByPrivateKey = (content: string, privateKey: string) => {
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    encrypt.setPrivateKey(privateKey);
    return encrypt.decrypt(content);
}


/**
 * 使用私钥进行数字签名
 * @param content 待签名内容
 * @param privateKey
 */
const sign = (content: string, privateKey: string) => {
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    encrypt.setPrivateKey(privateKey);
    return encrypt.sign(content, () => {}, '');
}

/**
 * 校验数字签名
 * @param content 待验证内容
 * @param publicKey 
 * @param signature 数字签名(encoded in base64)
 */
const verify = (content: string, publicKey: string, signature:string) =>{
    if (!encrypt) {
        encrypt = new JSEncrypt();
    }
    encrypt.setPublicKey(publicKey);
    return encrypt.verify(content, signature,()=>{});
}


export default {
    getPrivateKey,
    getPublicKey,
    encryptByPublicKey,
    encryptByPrivateKey,
    decryptByPublicKey,
    decryptByPrivateKey,
    sign,
    verify
}