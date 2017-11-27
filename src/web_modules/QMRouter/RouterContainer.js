import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { log } from 'core-js/library/web/timers';

/**
 * 
 */
export default class RouterContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { entries } = this.props || {};
        return this.RouteContainer(entries || []);
    }

    RouteContainer(routes) {
        if (Array.isArray(routes) && routes.length > 0) {
            return (
                <Switch>
                    {
                        routes.map((k, v) => {
                            let { name, path, exact, render } = k;
                            return (
                                <Route key={'k_' + name} {...k} render={(props) => {
                                    return React.createElement(k.render, props, null)
                                }} />
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

