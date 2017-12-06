import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import Util from 'util/Util';
import { Relax, IMap } from 'plume2';

const { SubMenu } = Menu;
const { Sider } = Layout;
const noop = () => { }

@Relax
export default class menu extends Component<any, any> {
    props: {
        relaxProps?: {
            data: IMap,
            setData: Function
        };
    };

    static relaxProps = {
        data: "data",
        setData: noop
    };

    render() {
        const { data } = this.props.relaxProps;

        return (
            <Sider width={165} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[data.get('menuKey')]}
                    defaultOpenKeys={[data.get('subMenuKey')]}
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
        const { setData } = this.props.relaxProps;

        let myProps: any = this.props;
        let { history } = myProps;
        if (myProps.location.pathname != url) {
            history.push(url);
        }
        let menuId = Util.ReplaceAll(url, '/', '');
        let subMenuId = url.split("/")[1];

        setData('memuName', name);
    }
}
