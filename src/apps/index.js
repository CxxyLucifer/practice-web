import styles from '../style/index.less';
import React, { Component } from "react"
import { render } from "react-dom"

import MainPage from './main'

class App extends Component {

    render() {
        return (
            <MainPage />
        )
    }
}

render(<App />, document.getElementById("content"))