import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';

import Util from 'util/Util';
import HeaderLay from './component/header';
import MenuLay from './component/menu';
import Bread from './component/bread';
import { StoreProvider } from 'plume2';
import AppStore from "./store";

const { Content } = Layout;
const MyMenuLay: any = MenuLay;

@withRouter
@StoreProvider(AppStore, { debug: __DEV__ })
export default class index extends Component<any, any> {
    store: AppStore;

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <MyMenuLay history={this.props.history} location={this.props.location} />
                <Layout style={{ padding: '0 10px 10px' }}>
                    <HeaderLay />
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
