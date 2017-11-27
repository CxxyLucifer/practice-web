import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from "react-router-dom"

import LazilyLoader from './LazilyLoader'
import { splitObject } from './RouterUtil'

const noop = () => { };

export default class BundleContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { bundles } = this.props || {};
		let bundlesNode = (bundles || []).map((v, k) => {
			let [l, r] = splitObject(v, ['key', 'name', 'title', 'source']);
			const { path } = r || {};
			const { name, title, source, unauthorize } = l || {};
			return (
				<Route key={'@bundle_r_' + name} {...r} strict render={(props) => (
					<LazilyLoader key={'@bundle_' + name} {...v} {...props} isBundle={true} />
				)} />
			)
		})

		return bundlesNode ?
			<Switch>
				{bundlesNode}
			</Switch>
			:
			null
	}

}