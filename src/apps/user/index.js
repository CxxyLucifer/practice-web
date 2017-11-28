import React, { Component } from 'react';
import { Table, Button, Pagination } from 'antd';
import Fetch from 'util/Fetch';

export default class index extends Component {
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
        Fetch('http://127.0.0.1:8080/user/getUserListByName?pageNum=' + (currentPage - 1) + '&pageSize=' + pageSize)
            .then((json) => {
                console.log('=====json:', json)
                _this.setState({ data: json.data, total: json.totalCount });
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
                <div style={{ marginBottom: 16 }}>
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
                                title: '姓名',
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
