import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import { RSAUtil } from 'comps';
import { Base64 } from 'js-base64';
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

    componentDidMount(){
        this._encryptPwd();
    }

    _encryptPwd =()=> {
        const txt = '我爱我的祖国，我爱我的家;i love my contry, i love my home!';
        // const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCFhCMuoQt54NAan0cvaPZeiS6xGqXtDZaJ+xVlUNIBYpsy+oXpe2mlhTtLaAHJfNLF1tNyBYgHfO3FADC/1vvEha2+ZtbecisjJ1YCkF2TJYOKlPpucBaAN0Nb03IlqS0c0m9xOA/Lqh+IbRyGkM4Vq+pLPzibYibCvLladzFpDQIDAQAB`;
        // const privateKey = `MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIWEIy6hC3ng0BqfRy9o9l6JLrEape0Nlon7FWVQ0gFimzL6hel7aaWFO0toAcl80sXW03IFiAd87cUAML/W+8SFrb5m1t5yKyMnVgKQXZMlg4qU+m5wFoA3Q1vTciWpLRzSb3E4D8uqH4htHIaQzhWr6ks/OJtiJsK8uVp3MWkNAgMBAAECgYAgfgjF10FgtrpOUEbVndifJwlq5k5NA0qIZ8dMMb/5wFJ+tIMUUAlk06ibcENHEo6EwQQSMpBpKhj/IU270gjQ76fqbtu+TJWL+uq5Ivm7MWWylIoIbvyKoMbPfMRUsSNS/p3v8OMD5O/htGiA6kjdD+i7xx3hJOmoqa4I1DnTAQJBAL2UFIm2dmbhXrH+vroO4XrMevzJxrvewLxOvMLu8fcgjUhFTLK3x46233cDJi2PrU9h6c8rjL/OBa1W2BzikM0CQQC0S6U6hoV6BxDWobm4wmNZ5jQbah5izoG11xlZWwjY8NaVResTmyEk9n5rzIjO0n147jbXHvtsnEnjN4QZITlBAkBopKddiKD8kuQhXhtLOlGN5fbxODOBmihLCS86boiTP52cydvXPohhp2HcIJnfRlKE4egcWc6cRQ1vK+Ootgr1AkBESg6oT0GJSdnX4ePNlls5Ntdvts8Rj7RToshoLvH38ajlW1lB0NVKAc86l3sOE24Q+vFso8CJj9zwoht3xTzBAkBdQhAQOJZ16lbzqJU7lrP+aY/i7ZgCA8JyTd1VyHKm5alIWWd+P0t9oyOzZx2JIIx77OGhL5A8dnNaqss0KzQ9`;
        
        // console.log('===== encryptTxt:', RSAUtil.encryptByPublicKey(txt, publicKey))


        // const decryptTxt = 'OvhsYm3vMxiibtnlHmj5O2bASrXDSJ5aSnbC5WCTyFGcg0nK4URTuxlVEyKWxWQwncLom7XzP86POMyhrVJzd4V+BIvzZvQIKorhpCylGO6lc6NpfPDIDIEDL34PJ0ak4zGg9/QYuiW1uFVHXTA1rBVv6i1FFpnWqVOG38TnQcY=';
        // const signedData = 'AHJuZypOENkDYWGp2tEDlYjqGfio2bc23ORlYopoVvYx0b3qrG0AzgguRcXvsyf+8VrLB5bnoGlgpKpfN7B46zV5ehXbrUHnX6BmCpvBKCqZFn+uUOXomfJQSxEQxv2DMeIeWKVOu3yc7C5FeiFcl8ur4F8KTWsiP9RBj/g0oXA=';
        
        // console.log('========decode:',decryptTxt);
        // console.log('=======decryptTxt:', RSAUtil.decryptByPublicKey(decryptTxt, publicKey));

        const publicKey = RSAUtil.getPublicKey();
        const privateKey = RSAUtil.getPrivateKey();

        console.log('======== publicKey:', publicKey);
        console.log('======== privateKey:', privateKey);

        const encryptTxt = RSAUtil.encryptByPrivateKey(txt, privateKey);
        console.log('===== encryptTxt:', encryptTxt)


        const decryptTxt = RSAUtil.decryptByPublicKey(encryptTxt, publicKey);
        console.log('===== decryptTxt:', decryptTxt)



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
