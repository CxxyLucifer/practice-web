import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import LazilyLoader from './LazilyLoader';

export default class ChunkContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { entries } = this.props;
		return this._RouteContainer(entries);
	}

	/**
	 * @method
	 * @param { Array } routes
	 * @description 递归遍历所有路由
	 */
	_RouteContainer(routes) {
		if (Array.isArray(routes) && routes.length > 0) {
			return (
				<Switch>
					{
						routes.map((v, k) => {
							let { name } = v;

							return (
								<Route {...v} key={'@chunk_r_' + name} render={(props) => {
									//code split && lazy load
									return <LazilyLoader key={'@chunk_' + name} {...v} {...props} />
								}} />
							)
						})
					}
				</Switch>
			)
		} else {
			return null
		}
	}
}