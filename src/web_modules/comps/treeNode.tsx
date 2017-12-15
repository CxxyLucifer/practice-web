
import './style/treeNode.less';
import React from 'react';
import { Icon, Input, Popconfirm } from 'antd';
import MyIcon from './icon';

/**
 * 不负责业务逻辑，只管交互逻辑，状态都交给父组件管理
 * props{
 *  leaf:boolean 是否叶子节点 用于控制Icon样式；
 *  cancel: function 取消按钮的响应事件
 * }
 */
const noop = () => { }

export default class TreeNode extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            editState: false,
            inputValue: props.text,
            mouseOver: false
        }
    }

    static defaultProps = {
        del: false,//删除按钮的回调函数
        add: false,//添加的回调
        edit: false,//编辑的回调
        submit: false,//提交的回调
        editState: false,//是否在编辑状态
        leaf: false
    }

    componentDidMount() {
        let myProps: any = this.props;
        let { id } = myProps.data;
        if (document.getElementById(`nodeInput_${id}`) && "focus" in document.getElementById(`nodeInput_${id}`)) {
            document.getElementById(`nodeInput_${id}`).focus()
        }
    }

    render() {
        let myProps: any = this.props;
        let myState: any = this.state;

        const InputStyle = {
            width: "60px",
            height: "16px",
            fontSize: 12,
            padding: 0
        }

        const butStyle = {
            marginLeft: "5px"
        }

        const { textStyle = {}, text, del = false, add = false, edit = false, editState = false, submit = false, data = {}, leaf, cancel = () => { } } = myProps;
        const { id } = data;
        const { inputValue, mouseOver } = myState;
        let formData = Object.assign(data, { orgName: inputValue })
        let proxySubmit = (formData?: any, e?: any) => { submit && submit(formData, e); e.stopPropagation() }
        // console.log("state",this.state)
        return (
            <div className={mouseOver ? "" : "hideBtn"} onMouseOver={(e) => { this.setState({ mouseOver: true }) }} onMouseLeave={(e) => { this.setState({ mouseOver: false }) }}>
                {
                    leaf ? <MyIcon type="icon-wenjianjia" style={{ color: '#5490df' }} /> : null
                }
                {
                    editState ?
                        <Input id={`nodeInput_${id}`} style={InputStyle} defaultValue={text}
                            name="orgName"
                            onClick={e => { e.stopPropagation() }}
                            value={inputValue}
                            onKeyDown={(e: any) => {
                                if (e.keyCode === 13) {
                                    proxySubmit();
                                }
                            }}
                            onBlur={(e) => { proxySubmit }}
                            onChange={(e) => {
                                this.setState({ inputValue: "target" in e ? e.target.value : e })
                            }
                            }
                        /> :
                        <span style={textStyle} onDoubleClick={edit}>{text}</span>
                }
                {
                    del ? <span style={{ width: 20, display: "inline-block" }}><Icon className="treeNodeBtn red" type="close-circle" onClick={e => { del(formData, e) }} style={butStyle} /></span > : ""
                }
                {
                    add ? <span style={{ width: 20, display: "inline-block" }}><Icon className="treeNodeBtn green" type="plus-circle" onClick={e => { add(formData, e) }} style={butStyle} /></span> : ""
                }
                {
                    edit ? <span style={{ width: 20, display: "inline-block" }}><Icon className="treeNodeBtn yellow" type={"edit"} style={butStyle} onClick={e => { edit(formData, e) }} /></span> : ''
                }
                {
                    editState ?
                        <span style={{ width: 40, display: "inline-block" }}>
                            <Icon className="treeNodeBtn yellow" type={"check"} style={butStyle} onClick={e => { submit(formData, e) }} />
                            <Icon className="treeNodeBtn yellow" type={"close"} style={butStyle} onClick={e => { cancel(formData, e) }} />
                        </span>
                        : ''
                }
            </div>
        )
    }
}