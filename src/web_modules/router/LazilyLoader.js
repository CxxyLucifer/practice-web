import React, { Component } from 'react'

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
		this._syncLoadChunk();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let { Component } = this.state;
		let { name, children } = this.props;

		if (Component) {
			return React.createElement(Component, this.props, children);
		} else {
			return null;
		}
	}

	/**
	 * @method
	 * @param {string} name chunk name
	 * @description 加载Chunk（页面分片chunkFile.js入口）
	 */
	_syncLoadChunk = async () => {
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
