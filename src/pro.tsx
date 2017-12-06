import './style/index.less';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ChunkContainer } from 'router';
import entries from './entries';

let ChunkContainerLay: any = ChunkContainer;

class App extends Component {
    render() {
        return (
            <ChunkContainerLay entries={entries} />
        )
    }
}
render(<App />, document.getElementById("content"))