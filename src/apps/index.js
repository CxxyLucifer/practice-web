import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../style/index.less'

class IndexComponent extends React.Component {
    render() {
        return <h1>hello world!!!</h1>
    }
}
ReactDOM.render(<IndexComponent />, document.getElementById("react-content"))