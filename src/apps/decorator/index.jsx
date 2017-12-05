import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

@withRouter
export default class index extends Component {

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                            <Menu.Item key="1">
                                <a href='javascript:void(0)' onClick={() => this._changeUrl('/user/list')}>userlist</a>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <a href='javascript:void(0)' onClick={() => this._changeUrl('/chart/line')}>chartline</a>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <a href='javascript:void(0)' onClick={() => this._changeUrl('/chart/pie')}>chartpie</a>
                            </Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 10, margin: 0 }}>
                        {
                            this.props.children
                        }
                    </Content>
                </Layout>
            </Layout>
        )
    }

    _changeUrl = (url) => {
        let { history } = this.props;
        if (this.props.location.pathname != url) {
            history.push(url);
        }
    }
}
