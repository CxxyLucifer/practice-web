import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"

import LazilyLoader from './LazilyLoader'
import { splitObject } from './RouterUtil'

export default class ChunkContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { entries } = this.props || {};
		return this.RouteContainer(entries || []);
	}

	/**
	 * @method
	 * @param { Array } routes
	 * @description 递归遍历所有路由
	 */
	RouteContainer(routes) {
		if (Array.isArray(routes) && routes.length > 0) {
			return (
				<Switch>
					{
						routes.map((v, k) => {
							let [l, r] = splitObject(v, ['name', 'title', 'unauthorize', 'routes', 'render']);
							let { name, title, unauthorize, routes: children, comp } = l || {};
							let { path } = r || {};
							if (Array.isArray(children) && children.length > 0) {
								return (
									<Route {...r} key={'@chunk_r_' + name} render={(props) => {
										return (
											//code split && lazy load
											<LazilyLoader key={'@chunk_' + name} {...v} {...props} isChunk >
												{this.RouteContainer(children)}
											</LazilyLoader>
										)
									}} />
								)
							} else {
								return (
									<Route {...r} key={'@chunk_r_' + name} render={(props) => {
										//code split && lazy load
										return <LazilyLoader key={'@chunk_' + name} {...v} {...props} isChunk />
									}} />
								)
							}
						})
					}
				</Switch>
			)
		} else {
			return null
		}
	}
}