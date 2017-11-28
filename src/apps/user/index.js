import React, { Component } from 'react';
import { Table, Button, Pagination } from 'antd';

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            currentPage: 1,
            pageSize: 10
        };
    }

    render() {
        const { loading, selectedRowKeys, currentPage, pageSize } = this.state;
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
                                title: 'Name',
                                dataIndex: 'name',
                                width: 200
                            }, {
                                title: 'Age',
                                dataIndex: 'age',
                                sorter: (a, b) => a.age - b.age,
                                width: 100
                            }, {
                                title: 'Address',
                                dataIndex: 'address',
                            }, {
                                title: 'Action',
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
                    defaultCurrent={currentPage}
                    defaultPageSize={pageSize}
                    total={500}
                    itemRender={this._itemRender}
                    showQuickJumper />
            </div>
        );
    }


    _onPageChange = (currentPage, pageSize) => {
        this.setState({ currentPage: currentPage, pageSize: pageSize })
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
