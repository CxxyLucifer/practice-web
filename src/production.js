import styles from './style/index.less';
import React, { Component } from 'react';
import { render } from 'react-dom';

import { ChunkContainer } from 'router';
import entries from './entries';

class App extends Component {
    render() {
        return (
            <ChunkContainer entries={entries} />
        )
    }
}
render(<App />, document.getElementById("content"))