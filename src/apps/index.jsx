import styles from '../style/index.less'

import React from 'react';
import ReactDOM from 'react-dom';

class IndexComponent extends React.Component {
    render() {
        return <h1>hello world!!!</h1>
    }
}
ReactDOM.render(<IndexComponent />, document.getElementById("content"))