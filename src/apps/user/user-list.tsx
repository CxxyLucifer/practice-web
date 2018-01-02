import React, { Component } from 'react';
import { Table, Button, Pagination, Modal, Divider, Layout, Popconfirm } from 'antd';
import objectAssign from 'object-assign';
import Fetch from 'util/Fetch';
import Dialog from 'util/Dialog';
import UserAdd from './user-add';
import { MyIcon, MyPopConfirm } from 'comps';

import ClassTree from './component/class-tree';

const { Sider } = Layout;
const MyPagination: any = Pagination;
const MyUserAdd: any = UserAdd;
const ModalIndex = "user";
const noop = () => { }

export default class UserList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            selectedRowKeys: [],
            loading: true,
            total: 0,
            paramObj: {
                classId: null,
                currentPage: 1,
                pageSize: 10
            }
        };
    }

    componentWillMount() {
        const { paramObj } = this.state;
        this._init(paramObj);
    }

    _init = ({ currentPage, pageSize, classId }: any) => {
        const _self = this;
        Fetch('http://127.0.0.1:8080/user/getUserList', {
            method: 'post',
            body: {
                pageNum: currentPage - 1,
                pageSize: pageSize,
                class_id: classId,
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

    _toDel = (id: any) => {
        __DEV__ && console.log('===== id:', id)
    }

    _onSelect = (id: any) => {
        __DEV__ && console.log('===== id:', id)
        const { paramObj } = this.state;
        id == 0 ? id = null : id;

        let obj = objectAssign(paramObj, { classId: id, currentPage: 1 });

        this.setState({ paramObj: obj });
        this._init(obj);
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
            <Layout style={{ height: '100%' }}>
                <Sider style={{ background: 'white', overflowY: 'auto' }}>
                    <ClassTree onChange={(id: any) => this._onSelect(id)} />
                </Sider>
                <div style={{ width: 1, borderWidth: 1, borderColor: 'grey', height: '100%' }} />
                <Layout style={{ backgroundColor: 'white', overflowY: 'auto' }}>
                    <div style={{ margin: 10 }}>
                        <Button
                            style={{ fontSize: 12, padingTop: 10 }}
                            type="primary"
                            size="default"
                            onClick={() => this._showAdd()}
                        >
                            新增
                        </Button>
                        {/* <MyIcon type="icon-folder-close" style={{ marginLeft: 10, color: 'blue' }} /> */}
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
                                            <MyPopConfirm okFun={() => this._toDel(record.key)} text='删除' />
                                        </span>
                                    )
                                },
                            ]
                        }
                    />
                    <div>
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
                </Layout>
            </Layout>
        );
    }


    _onPageChange = (currentPage: number, pageSize: number) => {
        const { paramObj } = this.state;
        let obj = objectAssign(paramObj, { currentPage: currentPage, pageSize: pageSize });
        this.setState({ paramObj: obj })

        this._init(obj);
    }

    _onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }
}
