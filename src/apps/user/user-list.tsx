import React, { Component } from 'react';
import { Table, Button, Pagination, Modal, Divider } from 'antd';
import Fetch from 'util/Fetch';
import Dialog from 'util/Dialog';
import UserAdd from './user-add';
import { MyIcon } from 'comps';

const MyPagination: any = Pagination;
const MyUserAdd: any = UserAdd;
const ModalIndex = "user";

export default class UserList extends Component<any, any> {
    constructor(props: any) {
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

    _init = (currentPage: number, pageSize: number) => {
        const _self = this;
        _self.setState({ loading: true });
        Fetch('http://127.0.0.1:8080/user/getUserListByName', {
            method: 'post',
            body: {
                pageNum: currentPage - 1,
                pageSize: pageSize
            }
        }).then((json: any) => {
            _self.setState({ data: json.data, total: json.totalCount, loading: false });
        }).catch((err: any) => {
            _self.setState({ loading: false });
        })
    }

    _showAdd = () => {
        Dialog.load(<MyUserAdd type='add' />, { title: "新增", ModalIndex, width: 720, className: 'modal-custom' }).then((res: any) => {
        })
    }

    _showEdit = () => {
        Dialog.load(<MyUserAdd type='edit' />, { title: "编辑", ModalIndex, width: 720, className: 'modal-custom' }).then((res: any) => {
        })
    }

    _toDel = (record: any) => {
        Modal.confirm({
            title: '提示',
            content: '您确定删除该条记录吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { data, loading, selectedRowKeys, total } = this.state;

        const rowSelection = {
            selectedRowKeys,
            fixed: true,
            onChange: this._onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ marginBottom: 10, marginLeft: 10 }}>
                    <Button
                        style={{ fontSize: 12 }}
                        type="primary"
                        size="default"
                        onClick={() => this._showAdd()}
                    >
                        新增
                    </Button>
                    <MyIcon type="icon-folder-close" style={{ marginLeft: 10 }} />
                    <span style={{ marginLeft: 8, fontSize: 12 }}>
                        {hasSelected ? `已选中 ${selectedRowKeys.length} 条数据` : ''}
                    </span>
                </div>
                <Table
                    size="middle"
                    locale={{ emptyText: '暂无数据' }}
                    dataSource={data}
                    loading={loading}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={
                        [
                            {
                                className: 'table-column',
                                title: '用户名',
                                dataIndex: 'user_name',
                                width: 200
                            }, {
                                className: 'table-column',
                                title: '班级',
                                dataIndex: 'class_name',
                            }, {
                                className: 'table-column',
                                title: '操作',
                                dataIndex: '',
                                width: 200,
                                render: (record) => (
                                    <span>
                                        <a href="javascript:void(0)" onClick={this._showEdit}>修改</a>
                                        <Divider type="vertical" />
                                        <a href="javascript:void(0)" onClick={() => this._toDel(record)}>删除</a>
                                    </span>
                                )
                            },
                        ]
                    }
                />
                <MyPagination
                    className='common-pagination'
                    style={{ margin: 16, fontSize: 12 }}
                    onChange={this._onPageChange}
                    showTotal={(total: number, range: any) => {
                        return total > 0 ? `当前第 ${range[0]} - ${range[1]} 条  共计 ${total} 条` : '没有符合条件的记录'
                    }}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={total}
                    showQuickJumper />
            </div>
        );
    }


    _onPageChange = (currentPage: number, pageSize: number) => {
        this._init(currentPage, pageSize);
    }

    _onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }
}
