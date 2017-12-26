import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';

import Util from 'util/Util';
import Header from './component/header';
import Menu from './component/menu';
import Breadcrumb from './component/bread';
import { StoreProvider } from 'plume2';
import AppStore from './store';

const { Content } = Layout;
const MyMenu: any = Menu;

@withRouter
@StoreProvider(AppStore, { debug: __DEV__ })
export default class index extends Component<any, any> {
    store: AppStore;

    render() {
        let myProps: any = this.props;
        let showMain = true;
        if (myProps.location.pathname == '/login') {
            showMain = false;
        }

        return (
            <div style={{ height: '100%' }}>
                {
                    showMain ?
                        <Layout style={{ height: '100%' }}>
                            <MyMenu history={this.props.history} location={this.props.location} />
                            <Layout style={{ overflow: 'hidden' }}>
                                <Header />
                                <Breadcrumb />
                                <Content style={{ background: '#fff', marginLeft: 5, marginRight: 5, height: '100%', overflow: 'hidden' }}>
                                    {
                                        myProps.children
                                    }
                                </Content>
                            </Layout>
                        </Layout>
                        :
                        myProps.children
                }
            </div>
        )
    }
}
