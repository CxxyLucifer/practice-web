import styles from './style/index.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHashHistory } from 'history';

import { ChunkContainer } from 'QMRouter';
import entries from './entries';

const history = createHashHistory();

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <div style={{ height: '100%' }}>
                    <ChunkContainer entries={entries} />
                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById("content"))