import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Button, AutoComplete } from 'antd';
import Validator from 'util/Validator';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this._handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('nickname', {
                        rules: [
                            { required: true, message: '请输入用户名', whitespace: true },
                            { min: 4, max: 20, message: '用户名4~20位' },
                            { pattern: '^[\u4e00-\u9fa5_a-zA-Z0-9]+$', message: '用户名只能由中文、英文或者数字以及下划线组成' }
                        ],
                    })(
                        <Input placeholder='用户名由中文、英文或者数字以及下划线组成,4-20位' />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码' },
                            { validator: this.checkConfirm }],
                    })(
                        <Input type="password" placeholder='请输入密码' />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [
                            { required: true, message: '请再次输入密码' },
                            { validator: this.checkPassword }
                        ]
                    })(
                        <Input type="password" placeholder='请再次输入密码' onBlur={this.handleConfirmBlur} />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="班级"
                >
                    {getFieldDecorator('class_id', {
                        rules: [{ required: true, message: '请选择班级' }],
                    })(
                        <Select placeholder="请选择班级">
                            <Option value="1">计算机一班</Option>
                            <Option value="2">计算机二班</Option>
                        </Select>
                        )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button style={{ float: 'right' }} type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        );
    }


    _handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('密码不一致!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
}

const UserAddForm = Form.create()(UserAdd);
export default UserAddForm;
