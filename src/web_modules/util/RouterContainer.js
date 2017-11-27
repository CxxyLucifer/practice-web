import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

export default class RouterContainer extends Component {

    static defaultProps = {
        entries: []
    }

    constructor(props) {
        super(props)
    }

    render() {
        let { entries } = this.props || {};
        return this.RouteContainer(entries || []);
    }

    RouteContainer = (routes) => {
        if (Array.isArray(routes) && routes.length > 0) {
            return (
                <Switch>
                    {
                        routes.map((k, v) => {
                            let { name, path, exact, render } = k;
                            return (
                                <Route key={'k_' + name} {...k} />
                            )
                        })
                    }
                </Switch>
            )
        } else {
            return null;
        }
    }

}

