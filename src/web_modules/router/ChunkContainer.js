import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import LazilyLoader from './LazilyLoader';

export default class ChunkContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return this._routeContainer();
	}

	_routeContainer() {
		let { entries } = this.props;

		if (Array.isArray(entries) && entries.length > 0) {
			return (
				<Switch>
					{
						entries.map((v, k) => {
							let { name } = v;
							return (
								<Route {...v} key={'@chunk_r_' + name} render={(props) => {
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