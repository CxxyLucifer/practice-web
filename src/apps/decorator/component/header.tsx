/**
 * Created by liuhui on 2017/12/6.
 */
import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { Relax, IMap } from 'plume2';
import Util from 'util/Util';

const { Header } = Layout;
const noop = () => { }

@Relax
export default class header extends Component<any, any> {
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

        let collapsed = this._get('collapsed');

        return (
            <Header style={{ background: '#fff', padding: 0, marginLeft: -10, marginRight: -10 }}>
                <Icon
                    className="header-trigger"
                    type={collapsed == 'true' ? 'menu-unfold' : 'menu-fold'}
                    onClick={this._collasped}
                />
                <div className="header-right-wrap">
                    <ul className="header-right">
                        <li title="用户信息" className="header-item">
                            <div className="user-info-item">
                                <div className="avatar-box">
                                    <img src="//wx.qlogo.cn/mmopen/PiajxSqBRaEJxB8huFKfjvm8ldm8IoicBo1bI3EZ2SUa3JibA092VqpYkQfpoX31krJP7IqHibUdvZJUkayRWPpQIw/0" />
                                </div>
                                <div className="user-info">
                                    <div className="user-name">173****8115</div>
                                    <div className="user-role">楠色星辰</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Header>
        )
    }

    _collasped = () => {
        const { data, setData, updateCache } = this.props.relaxProps;

        data.get('collapsed') == 'true' ? setData('collapsed', 'false') : setData('collapsed', 'true');
        data.get('collapsed') == 'true' ? updateCache('collapsed', 'false') : updateCache('collapsed', 'true');
    }

    _get = (key: string) => {
        const { data, getCache } = this.props.relaxProps;

        return Util.isNotEmpty(getCache(key)) ? getCache(key) : data.get(key);
    }
}
