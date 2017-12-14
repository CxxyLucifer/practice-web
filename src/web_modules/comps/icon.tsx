/**
 * @author liuhui
 * @date 2017/12
 *
 * @description
 */
import React, { Component } from 'react';
import classname from 'classnames';
import { splitObject } from '../util/ObjectUtil';

export interface IconProps {
    type?: string;
}

export default class Icon extends Component<IconProps, any> {
    static defaultProps = {
        onClick: () => { }
    }

    render() {
        let [{ type, className }, props] = splitObject(this.props, ['type', 'className']);
        let classnames = classname({
            [`iconfont`]: true,
            [`${type}`]: !!type,
            [`${className}`]: !!className
        });
        return <i {...props} className={classnames} />
    }

}