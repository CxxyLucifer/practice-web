import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Util from 'util/Util';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class menu extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            memuName: '用户管理',
            subMenuKey: 'user',
            menuKey: 'userlist'
        };
    }

    render() {
        const { memuName, subMenuKey, menuKey } = this.state;

        return (
            <Sider width={165} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[menuKey]}
                    defaultOpenKeys={[subMenuKey]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="user" title={<span><Icon type="user" />系统管理</span>}>
                        <Menu.Item key="userlist">
                            <a href='javascript:void(0)' onClick={() => this._changeUrl('/user/list', '用户管理')}>用户管理</a>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="chart" title={<span><Icon type="laptop" />图表</span>}>
                        <Menu.Item key="chartline">
                            <a href='javascript:void(0)' onClick={() => this._changeUrl('/chart/line', '折线图')}>折线图</a>
                        </Menu.Item>
                        <Menu.Item key="chartpie">
                            <a href='javascript:void(0)' onClick={() => this._changeUrl('/chart/pie', '饼图')}>饼图</a>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }

    _changeUrl = (url: string, name: string) => {
        let { history } = this.props;
        if (this.props.location.pathname != url) {
            history.push(url);
        }
        let menuId = Util.ReplaceAll(url, '/', '');
        let subMenuId = url.split("/")[1];

        this.setState({ memuName: name })
    }
}
