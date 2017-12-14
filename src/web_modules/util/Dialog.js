/**
 * @description 这里对ant design中的modal进行了封装
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import assign from "object-assign";
import { Modal } from "antd";
import { splitObject } from "./ObjectUtil";
import QMModal from './Modal';

const Dialog = {
  nodes: {},
  props: {
    title: "", //标题	React.Element	|| 'string'
    visible: true,
    closable: true, //是否显示右上角的关闭按钮
    onCancel: undefined, //点击遮罩层或右上角叉或取消按钮的回调
    width: 500, //宽度	String or Number
    style: {}, //可用于设置浮层的样式，调整浮层位置等
    maskClosable: true, //点击蒙层是否允许关闭
    wrapClassName: "vertical-center-modal" //对话框外层容器的类名	String	-
  },

  load(content, opt) {
    let self = this;
    let _hash = (Math.random() + "").substr(2, 9);
    let defaultProps = {
      transitionName: "zoom",
      maskTransitionName: "fade",
      footer: ""
    };
    let [{ index = _hash }, props] = splitObject(
      { ...this.props, ...opt, ...defaultProps },
      ["index"]
    );
    let { visible = true, onCancel } = props || {};

    //创建弹窗DOM
    self.nodes[index] = document.createElement("div");
    document.body.appendChild(self.nodes[index]);

    let promise = new Promise(function (resolve, reject) {
      //cancel回调处理
      if (typeof onCancel !== "function") {
        onCancel = () => self.close.call(null, null, index, resolve);
      }
      let close = arg => self.close.call(null, arg, index, resolve);
      //render到DOM中
      ReactDOM.render(
        <Modal {...props} onCancel={onCancel}>
          {React.cloneElement(content, { close, fail })}
        </Modal>,
        self.nodes[index]
      );
      function fail() {
        let _close = () => self.close.call(null, null, index, null);
        //失败回调
        reject(_close);
      }
    });
    return promise;
  },


  /**
   *  侧边弹窗 
   *  
   * Dialog.side(
   *      <Test />
   *    ).then(res => {
   *       console.log("res:", res);
   *   });
   * 
   * <Test /> 组件里面可以通过this.props.close.bind(this,返回值)关闭侧边滑框
   * 多层调用侧边弹框，左侧蒙层数量始终为1层
   */
  side(content, opt) {
    let self = this;
    let _hash = (Math.random() + "").substr(2, 9);
    let [{ index = _hash }, props] = splitObject({ ...this.props, ...opt }, [
      "index"
    ]);

    //创建弹窗DOM
    self.nodes[index] = document.createElement("div");
    document.body.appendChild(self.nodes[index]);

    let promise = new Promise(function (resolve, reject) {
      let close = arg =>
        self.close.call(null, arg, index, resolve);
      //用于计算蒙层显示的个数和左上角关闭按钮的样式
      const count = Object.getOwnPropertyNames(self.nodes).length;
      //render到DOM中
      ReactDOM.render(
        <QMModal
          onClose={close}
          count={count}
          fail={fail}
          {...props}
          id={index}
        >
          {content}
        </QMModal>,
        self.nodes[index]
      );
      function fail() {
        let _close = () => self.close.call(null, null, index, null);
        //失败回调
        reject(_close);
      }
    });
    return promise;
  },

  /**
   * 外部关闭
   */
  close(arg, index, resolve) {
    if (!!index) {
      removeNode(Dialog.nodes[index]);
    }
    if (resolve != undefined) {
      resolve(arg);
    }
    delete Dialog.nodes[index];
    function removeNode(node) {
      const unmountResult = ReactDOM.unmountComponentAtNode(node);
      if (unmountResult) {
        //组件是否注销
        node.parentNode.removeChild(node);
      } else {
        console.error(`组件未注销`);
      }
    }
  },

  /**
   *  打开链接 暂未开通
   */
  openUrl() { }
};

export default Dialog;
