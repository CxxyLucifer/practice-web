import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import Util from 'util/Util';
import HeaderLay from './component/header';
import MenuLay from './component/menu';
import Bread from './component/bread';

const { Content } = Layout;

@withRouter
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <MenuLay {...this.props} />
                <Layout style={{ padding: '0 10px 10px' }}>
                    <HeaderLay {...this.props} />
                    <Bread />
                    <Content style={{ background: '#fff', padding: 10, margin: 0 }}>
                        {
                            this.props.children
                        }
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
