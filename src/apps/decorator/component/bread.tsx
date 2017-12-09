/**
 * Created by liuhui on 2017/12/6.
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Relax, IMap } from 'plume2';
import Util from 'util/Util';

const noop = () => { }

@Relax
export default class bread extends Component<any, any> {
    props: {
        relaxProps?: {
            data: IMap,
            getCache: Function
        };
    };

    static relaxProps = {
        data: "data",
        getCache: noop
    };

    render() {
        const { data } = this.props.relaxProps;
        let memuName = this._get('memuName');

        return (
            <Breadcrumb style={{ margin: '10px 5px' }}>
                <Breadcrumb.Item>{memuName}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }

    _get = (key: string) => {
        const { data, getCache } = this.props.relaxProps;

        return Util.isNotEmpty(getCache(key)) ? getCache(key) : data.get(key);
    }
}
