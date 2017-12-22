import './style/index.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import { ChunkContainer } from 'router';
import entries from './entries';
import Decorator from './apps/decorator';

const history = createHashHistory();
const MyChunkContainer: any = ChunkContainer;

class App extends Component<any, any> {
    render() {
        return (
            <Router history={history}>
                <Decorator>
                    <div style={{ height: '100%' }}>
                        <Route exact path="/" render={() => (
                            <Redirect to="/user/list" />
                        )} />
                        <MyChunkContainer entries={entries} />
                    </div>
                </Decorator>
            </Router>
        )
    }
}
render(<App />, document.getElementById("content"))