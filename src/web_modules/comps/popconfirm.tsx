/**
 * @author liuhui
 * @date 2017/12
 *
 * @description
 */
import React, { Component } from 'react';
import { Popconfirm } from 'antd';

const noop = () => { }

export interface props {
    okFun: any;
    text: string;
    tip?: string;
}

export default class PopConfirm extends Component<props, any> {
    render() {
        const { okFun, text, tip } = this.props;

        return (
            <Popconfirm title={<span style={{ fontSize: 12 }}>{tip ? tip : '确定删除该条记录吗?'}</span>}
                onConfirm={okFun}
                onCancel={noop}
                okText={<span style={{ fontSize: 8 }}>确定</span>}
                cancelText={<span style={{ fontSize: 8 }}>取消</span>}
            >
                <a href="javascript:void(0)">{text}</a>
            </Popconfirm>
        )
    }
}