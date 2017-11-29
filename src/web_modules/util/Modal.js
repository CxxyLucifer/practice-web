import React, { Component } from "react";
import classNames from "classnames";
import assign from "object-assign";
import { Icon } from "antd";

export default class QMModal extends Component {
  static defaultProps = {
    onClose: () => {}
  }

  componentDidMount() {
    const modal = document.getElementById(this.props.id);
    setTimeout(() => {
      this.move(modal, "left", () => {});
    }, 10);
  }

  /**
   * flag = "left" || "right"
   * @param flag
   */
  move = (tagObject, flag, callback) => {
    const direct = flag == "left" ? "qm-modal show-modal" : "qm-modal";
    if (tagObject) {
      tagObject.setAttribute("class", direct);
      callback();
    }
  };

  render() {
    const { style, count } = this.props;

    const wrapperCls = classNames({
      "qm-modal-main": true
    });

    const close = this.close;
    return (
      <div className="qm-modal" style={style} id={this.props.id}>
        {count == 1 ? <div className="qm-modal-mask" /> : null}
        <div className={wrapperCls}>
          <button
            className="qm-modal-close"
            onClick={this.close.bind(this, null)}
          >
            {count > 1 ? <Icon type="left" /> : <Icon type="close" />}
          </button>

          <div className="qm-modal-body">
            {React.cloneElement(this.props.children, { close })}
          </div>
        </div>
      </div>
    );
  }

  close = e => {
    const modal = document.getElementById(this.props.id);
    this.move(modal, "right", () => {
      setTimeout(() => {
        this.props.onClose(e);
      }, 500);
    });
  };
}
