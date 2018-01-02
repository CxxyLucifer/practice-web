import React, { Component } from 'react';
import Exception from 'ant-design-pro/lib/Exception';

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

	_syncLoadChunk = async () => {
		let { Component } = this.state;
		let { render } = this.props;

		if (!this._isMounted) return null;

		try {
			let module = await render();
			this.setState({ Component: module["default"] || module });
		} catch (e) {
			console.error('chunk加载错误:', e);
			this.setState({
				Component: <Exception type="404" />
			});
		}
	}
}
