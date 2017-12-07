import React, { Component } from 'react';
import { Table, Button, Pagination, Modal } from 'antd';
import Fetch from 'util/Fetch';
import Dialog from 'util/Dialog';
import UserAdd from './user-add';

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
        Fetch('http://127.0.0.1:8080/user/getUserListByName?pageNum=' + (currentPage - 1) + '&pageSize=' + pageSize)
            .then((json: any) => {
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
                    className="comom-table"
                    size="middle"
                    locale={{ emptyText: '暂无数据' }}
                    dataSource={data}
                    loading={loading}
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
                                render: (key) => <a href="javascript:void(0)" onClick={this._showEdit}>修改</a>
                            },
                        ]
                    }
                />
                <MyPagination
                    className='common-pagination'
                    style={{ margin: 16 }}
                    onChange={this._onPageChange}
                    showTotal={(total: number, range: any) => `当前第 ${range[0]} - ${range[1]} 条  共计 ${total} 条`}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={total}
                    itemRender={this._itemRender}
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

    _itemRender(current: number, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
}
