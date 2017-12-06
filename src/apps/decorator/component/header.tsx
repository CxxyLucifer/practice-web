import React, { Component } from 'react'
import { Relax, IMap } from 'plume2';

@Relax
export default class header extends Component<any, any> {
    props: {
        relaxProps?: {
            data: IMap
        };
    };

    static relaxProps = {
        data: "data"
    };

    componentDidMount() {
        const { data } = this.props.relaxProps;
    }

    render() {
        return (
            <div className="root-header-container">
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
            </div>
        )
    }

}
