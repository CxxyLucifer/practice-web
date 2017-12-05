import { log } from "core-js/library/web/timers";

'use strict';

/**
 * @method appendBundles
 * @param { String } name 文件key值
 * @param { String } src 文件路径
 * @return { Promise } 返回promise对象
 * @description 控制台入口main.js
 */
const appendBundles = ({ name, src, onload, onerror }) => {
	if (document.getElementById(name)) {
		onload();
	} else {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.id = name;
		script.timeout = 30000;
		script.src = src || 'javascript:void(0);';
		script.onerror = onerror;
		script.onload = onload;
		document.body.appendChild(script);
	}
};

/**
 * @method appendLink
 * @author gcy[of1518]
 * @date 2017.06
 * @param { String } name
 * @param { String } href
 * @description 加载样式
 */
const appendLink = ({ name, href }) => {
	if (document.getElementById(name)) {
		console.info('已经存在！');
	} else {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.id = name;
		link.href = href || '';
		document.head.appendChild(link);
	}
};

/**
 * @method
 * @author gcy[of1518]
 * @date 2017.07
 * @param { Object } target
 * @param { String[] } source
 * @description assign
 */
const assign = Object.assign || function (target, source) {
	let keys = Object.keys(Object(source));
	for (let i = 0; i < keys.length; i++) {
		target[keys[i]] = source[keys[i]];
	}
	return target;
};

/**
 * @method
 * @author gcy[of1518]
 * @date 2017.07
 * @param { Object } obj
 * @param { String[] } parts
 * @description splict obj
 */
const splitObject = (obj, parts) => {
	let extra = {}, orign = {};
	Object.keys(obj).forEach((v) => {
		parts.indexOf(v) !== -1 ? extra[v] = obj[v] : orign[v] = obj[v];
	});
	return [extra, orign];
};

export {
	appendBundles, appendLink, assign, splitObject
}