import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import '../../style/login.less';

const MyForm: any = Form;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const MyButton: any = Button;

@MyForm.create()
export default class Login extends Component<any, any> {
    interval: any;
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
            type: 'account',
        };
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { count, type } = this.state;

        return (
            <div className="container">
                <div className="login-top">
                    <div className="login-header">
                        <Link to="/">
                            <span className="login-title">登录</span>
                        </Link>
                    </div>
                    <div className="login-desc"></div>
                </div>
                <div className="main">
                    <Form onSubmit={this._handleSubmit}>
                        <Tabs animated={false} className="tabs" activeKey={type} onChange={this.onSwitch}>
                            <TabPane tab="账户密码登录" key="account">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{
                                            required: type === 'account', message: '请输入账户名！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="user" style={{ marginTop: '-43%' }} className="prefixIcon" />}
                                            placeholder="admin"
                                        />
                                        )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: type === 'account', message: '请输入密码！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="lock" style={{ marginTop: '-43%' }} className="prefixIcon" />}
                                            type="password"
                                            placeholder="888888"
                                        />
                                        )}
                                </FormItem>
                            </TabPane>
                            <TabPane tab="手机号登录" key="mobile">
                                <FormItem>
                                    {getFieldDecorator('mobile', {
                                        rules: [{
                                            required: type === 'mobile', message: '请输入手机号！',
                                        }, {
                                            pattern: /^1\d{10}$/, message: '手机号格式错误！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="mobile" style={{ marginTop: '-43%' }} className="prefixIcon" />}
                                            placeholder="手机号"
                                        />
                                        )}
                                </FormItem>
                                <FormItem>
                                    <Row gutter={8}>
                                        <Col span={16} style={{ paddingTop: 4 }}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{
                                                    required: type === 'mobile', message: '请输入验证码！',
                                                }],
                                            })(
                                                <Input
                                                    size="large"
                                                    prefix={<Icon type="mail" style={{ marginTop: '-43%' }} className="prefixIcon" />}
                                                    placeholder="验证码"
                                                />
                                                )}
                                        </Col>
                                        <Col span={8}>
                                            <MyButton
                                                disabled={count}
                                                className="getCaptcha"
                                                size="large"
                                                onClick={this.onGetCaptcha}
                                            >
                                                {count ? `${count} s` : '获取验证码'}
                                            </MyButton>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                        <FormItem className="additional">
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox className="autoLogin">自动登录</Checkbox>
                                )}
                            <a className="forgot" href="">忘记密码</a>
                            <Button size="large" className="submit" type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="footer">
                    <div className="links">
                        <a target="_blank" href="">帮助</a>
                        <a target="_blank" href="">隐私</a>
                        <a target="_blank" href="">条款</a>
                    </div>
                    <div className="copyright">Copyright</div>
                </div>
            </div>
        );
    }

    onSwitch = (type: any) => {
        this.setState({ type });
    }

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    _handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields({ force: true },
            (err: any, values: any) => {
                if (!err) {

                    this._redirect('/user/list');
                }
            }
        );
    }

    _redirect = (url?: string) => {
        let myProps: any = this.props;
        let { history } = myProps;

        if (myProps.location.pathname != url) {
            history.push(url || '/');
        }
    }
}
