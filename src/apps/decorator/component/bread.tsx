import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

export default class bread extends Component<any, any> {
    render() {
        return (
            <Breadcrumb style={{ margin: '10px 5px' }}>
                <Breadcrumb.Item>{''}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
