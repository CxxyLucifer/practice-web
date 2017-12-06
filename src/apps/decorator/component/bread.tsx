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
        let memuName = Util.isNotEmpty(this._getChache('memuName')) ? this._getChache('memuName') : data.get('memuName');

        return (
            <Breadcrumb style={{ margin: '10px 5px' }}>
                <Breadcrumb.Item>{memuName}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }

    _getChache = (key: string) => {
        const { getCache } = this.props.relaxProps;
        return getCache(key);
    }
}
