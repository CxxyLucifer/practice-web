import React, { Component } from 'react'
import { appendBundles, appendLink, assign, splitObject } from './RouterUtil'

const noop = () => { }

export default class LazilyLoader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Component: null
		};
	}

	componentDidMount() {
		this._isMounted = true;
		let { isBundle, isChunk } = this.props || {};
		if (isBundle) {
			//load bundle，
			//bundle.js是各业务线的入口文件［js|css］
			this.syncLoadBundle(this.props);
		} else if (isChunk) {
			//load chunk
			//chunk.js是各业务模块下code split形成的chunk文件
			this.syncLoadChunk(this.props);
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let { Component } = this.state || {};
		let [props] = splitObject(this.props || {},
			['name', 'children', 'match', 'history', 'location']);
		let { name, children } = props || {};
		//更具name生成ref
		let ref = (name || 'componentProxy').replace(/\-|\_|\./g, m => '').toLowerCase();

		if (Component) {
			return React.createElement(Component, props, children);
		} else {
			return null;
		}
	}

	/**
	 * @method
	 * @param { String } name
	 * @param { String } source
	 * @description 加载Bundle（业务线main.js入口）
	 */
	syncLoadBundle({ name, source }) {
		let self = this;
		let { Component } = this.state || {};
		try {
			if (window['@bundle-' + name]) {
				//从缓存里获取,目前采用约定形势来渲染暴露在window对象下的类
				self.setState({ Component: window['@bundle-' + name] || null });
				return
			}
			if (!this._isMounted) return null;
			//TODO:目前只支持单入口js,后期会提供多入口js,让业务线有更好的split方案
			Object.keys(source).forEach(k => {
				let v = source[k];
				if (v.includes('.css')) {
					appendLink({ name: name + '-' + k, href: v })
				} else if (v.includes('.js')) {
					//通过<script/> append dom来load js
					appendBundles({
						name: name + '-' + k,
						src: v,
						onload: () => self.setState({ Component: window['@bundle-' + name] || null }),
						onerror: () => console.error(`${name}|${v}加载失败！`)
					});
				}
			})
		} catch (e) {
			console.error(e || 'bundle加载错误!');
		}
	}

	/**
	 * @method
	 * @param {string} name chunk name
	 * @description 加载Chunk（页面分片chunkFile.js入口）
	 */
	async syncLoadChunk({ name }) {
		let self = this;
		let { Component } = this.state || {};
		let { render } = this.props;
		if (!this._isMounted) return null;
		try {
			//import() return promise对象来lazy load
			let module = await render();
			this.setState({
				Component: module["default"] || module || null
			});
		} catch (e) {
			console.error('chunk加载错误-main', e || 'chunk加载错误!');
			this.setState({
				Component: ChunkNotFound
			});
		}

	}

}

/**
 * @class
 * @description chunk laod出错，时的渲染逻辑
 */
class ChunkNotFound extends Component {
	render() {
		return <div>抱歉，没有找到页面</div>
	}
}
