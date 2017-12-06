import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Relax, IMap } from 'plume2';

@Relax
export default class bread extends Component<any, any> {
    props: {
        relaxProps?: {
            data: IMap
        };
    };

    static relaxProps = {
        data: "data"
    };

    render() {
        const { data } = this.props.relaxProps;

        return (
            <Breadcrumb style={{ margin: '10px 5px' }}>
                <Breadcrumb.Item>{data.get('memuName')}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
