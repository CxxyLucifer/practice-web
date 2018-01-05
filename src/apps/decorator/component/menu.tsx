/**
 * Created by liuhui on 2017/12/6.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { MyIcon, Util } from 'comps';
import { Relax, IMap } from 'plume2';

const { SubMenu } = Menu;
const { Sider } = Layout;
const noop = () => { }

@Relax
export default class menu extends Component<any, any> {
    props: {
        relaxProps?: {
            data: IMap,
            setData: Function,
            updateCache: Function,
            getCache: Function
        };
    };

    static relaxProps = {
        data: "data",
        setData: noop,
        updateCache: noop,
        getCache: noop
    };

    render() {
        const { data } = this.props.relaxProps;

        let menuKey = this._get('menuKey');
        let subMenuKey = this._get('subMenuKey');
        let collapsed = this._get('collapsed');

        return (
            <Sider
                className="layout-sider"
                trigger={null}
                collapsible
                width={256}
                collapsed={collapsed == 'true'}
            >
                <div className="common-logo">
                    <MyIcon type="icon-lianxi" style={{ color: '#5490df', fontSize: 30 }} />
                    <h1>Practice Web</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[menuKey]}
                    defaultOpenKeys={[subMenuKey]}
                    style={{ height: 'calc(100% - 64)', borderRight: 0, padding: '16px 0' }}
                >
                    <SubMenu key="user" title={<span><Icon type="user" /><span>系统管理</span></span>}>
                        <Menu.Item key="userlist">
                            <a href='javascript:void(0)' onClick={() => this._changeUrl('/user/list', '用户管理')}>用户管理</a>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="chart" title={<span><Icon type="laptop" /><span>图表</span></span>}>
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
        const { setData, updateCache } = this.props.relaxProps;

        let myProps: any = this.props;
        let { history } = myProps;
        if (myProps.location.pathname != url) {
            history.push(url);
        }
        let menuId = Util.ReplaceAll(url, '/', '');
        let subMenuId = url.split("/")[1];
        updateCache('menuKey', menuId);
        updateCache('subMenuKey', subMenuId);
        updateCache('memuName', name);
        setData('memuName', name);
    }

    _get = (key: string) => {
        const { data, getCache } = this.props.relaxProps;
        return Util.isNotEmpty(getCache(key)) ? getCache(key) : data.get(key);
    }
}
