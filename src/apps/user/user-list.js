import React, { Component } from 'react';
import { Table, Button, Pagination, Modal } from 'antd';
import Fetch from 'util/Fetch';
import Dialog from 'util/Dialog';

import UserAdd from './user-add';

const ModalIndex = "user";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedRowKeys: [],
            loading: false,
            total: 0
        };
    }

    componentWillMount() {
        this._init(1, 10);
    }

    _init = (currentPage, pageSize) => {
        const _this = this;
        Fetch('http://127.0.0.1:8080/user/getUserListByName?pageNum=' + (currentPage - 1) + '&pageSize=' + pageSize).then((json) => {
            //console.log('=====json:', json)
            _this.setState({ data: json.data, total: json.totalCount });
        })
    }

    _showAdd = () => {
        Dialog.load(<UserAdd />, { title: "新增", ModalIndex, width: 720, className: 'modal-custom' }).then((res) => {
        })
    }

    render() {
        const { data, loading, selectedRowKeys, total } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this._onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ marginBottom: 16, marginTop: 16, marginLeft: 16 }}>
                    <Button
                        type="primary"
                        onClick={() => this._showAdd()}
                    >
                        新增
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `已选中 ${selectedRowKeys.length} 条数据` : ''}
                    </span>
                </div>
                <Table
                    dataSource={data}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={
                        [
                            {
                                title: '用户名',
                                dataIndex: 'user_name',
                                width: 200
                            }, {
                                title: '班级',
                                dataIndex: 'class_name',
                            }, {
                                title: '操作',
                                dataIndex: '',
                                render: () => <a href="#">修改</a>
                            },
                        ]
                    }
                />
                <Pagination
                    className='common-pagination'
                    onChange={this._onPageChange}
                    showTotal={(total, range) => `当前第 ${range[0]} - ${range[1]} 条  共计 ${total} 条`}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={total}
                    itemRender={this._itemRender}
                    showQuickJumper />
            </div>
        );
    }


    _onPageChange = (currentPage, pageSize) => {
        this._init(currentPage, pageSize);
    }

    _onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    _itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
}
