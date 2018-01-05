import React from 'react';
import { Tree, message, Modal } from 'antd';
import { fromJS } from 'immutable';
import { MyTreeNode, Fetch } from 'comps';

const TreeNode = Tree.TreeNode;

/**
 * 所以设计一下树的数据结构：{
 *  orgId:"" //也就是orgId
 *  orgName:""
 *  type:"" //分为新增节点和普通节点 默认普通节点 为新增节点时 有一个虚拟的orgId
 *  editStatus:boolean //不解释了 这个
 *  readonly: boolean //只读 不允许编辑
 *  delable: boolean //是否允许删除
 *  addible: boolean //是否能添加子节点
 *  children:[],
 *  cancel: function 取消按钮的响应事件
 * }
 */
export default class ClassTree extends React.Component<any, any> {
    static defaultProps = {
        onChange: () => { },
        orgName: '班级',
        depth: 1,
        pid: '1'
    }

    newId = ""

    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            expandedKeys: ["0"],
            selectedKeys: ["0"]
        }
    }

    resolveResData(data: any) {
        let { orgName } = this.props;
        let array: any = [];
        let tree = [{ orgName: orgName, orgId: "0", children: array }];
        let loop = (pid: any, tree: any) => {
            data && data.map((v: any) => {
                if (v.pid === pid) {
                    let arr = [];
                    if (!(tree.children instanceof Array)) {
                        tree.children = [];
                    }
                    arr = tree.children;
                    arr.push(v)
                    loop(v.orgId, arr[arr.length - 1] || [])
                }
            })
        }
        loop("0", tree[0])
        // console.log("tree",tree);
        return tree
    }

    setTreeData(condition: any, newData: any, tree: any) {
        // let tree = this.state.data;
        let newTree = fromJS(tree).toJS();

        let findNode = (judge: any, tree: any, newData: any) => {
            tree.map((node: any) => {
                if (judge(node)) {
                    node = Object.assign(node, newData)
                } else {
                    if (node.children && node.children.length > 0) {
                        findNode(judge, node.children, newData)
                    }
                }
            })
        }
        findNode(condition, newTree, newData)
        return newTree;
    }

    componentDidMount() {
        this.upDateTree();
    }

    handleExpand(expandedKeys: any) {
        this.setState({ expandedKeys })
    }

    handleSelected(selectedKeys: any, e?: any) {
        const { onChange } = this.props;
        this.setState({ selectedKeys: selectedKeys.length ? selectedKeys : ["0"] });
        onChange(selectedKeys[0]);
    }

    upDateTree() {
        const { depth } = this.props;
        Fetch('http://127.0.0.1:8080/class/allList').then((res: any) => {
            let data = this.resolveResData(res.data)
            data = this.setTreeData((node: any) => node.orgId === "0", { readonly: true, delable: false }, data)
            data = this.setTreeData((n: any) => n.depth >= depth, { addible: false }, data);
            this.setState({ data });
        })
    }

    render() {
        const { data, expandedKeys, selectedKeys } = this.state;
        let that = this;

        const submit = (data: any, e: any) => {
            let { pid, orgName, type, id } = data;
            let postData = {
                class_id: id,
                pid: pid,
                class_name: orgName
            }
            if (orgName && orgName.length > 15) {
                message.error("不能超过10字")
                e.stopPropagation()
                return
            }
            e.stopPropagation()
            switch (type) {
                case "add":
                    Fetch('http://127.0.0.1:8080/class/add', {
                        method: "POST",
                        body: postData,
                    }).then((res: any) => {
                        if (res.data.status === "ok") {
                            message.success("新增成功");
                        }
                        this.upDateTree();
                    })
                    break;
                case "normal":
                    (postData as any).orgId = id;
                    Fetch('http://127.0.0.1:8080/class/update', {
                        method: "POST",
                        body: postData,
                    }).then((res: any) => {
                        if (res.data.status === "ok") {
                            message.success("编辑成功");
                            this.handleSelected(that);
                        }
                        this.upDateTree();
                    })
                    break;
                default:
                    break;
            }
        }


        const del = (data: any, e: any) => {
            e.stopPropagation()
            Modal.confirm({
                title: '提示',
                content: '您确定删除【' + data.orgName + '】吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    const { reload } = this.props;
                    Fetch(`http://127.0.0.1:8080/class/delete/${data.id}`).then((res: any) => {
                        if (res.data.status === "ok") {
                            message.success("删除成功")
                            this.upDateTree();
                        }
                    })
                }
            });
        }



        const loop = (item: any) => item.map((v: any, k: any) => {
            let { readonly = false, delable = true, addible = true, orgId, orgName, type = "normal", children, pid = "", editStatus } = v;
            let isLeaf = !(children && children.length);

            return <TreeNode key={orgId} title={<MyTreeNode data={{ id: orgId, type: type, pid: pid }} text={orgName}
                submit={submit}
                textStyle={{ fontSize: 12, marginLeft: 4 }}
                edit={readonly ? false : edit}
                add={addible ? add : false}
                editState={editStatus}
                del={delable ? del : false}
                cancel={cancel}
                leaf={isLeaf}
            />} >
                {
                    children ? loop(children) : ""
                }
            </TreeNode>
        })

        const cancel = () => {
            this.upDateTree();
        }

        const edit = (node: any, e: any) => {
            // console.log("edit")
            const { data } = that.state;
            const newData = that.setTreeData((n: any) => n.orgId === node.id, { editStatus: true, readonly: true, delable: false, addible: false }, data);
            that.setState({ data: newData })
            e.stopPropagation()
        }

        const add = (e: any, event: any) => {
            let id = e.id;
            let newId = this.newId
            let searchTree = (tree: any) => {
                for (let n in tree) {
                    let v = tree[n];
                    if (v.orgId === id) {
                        let node = { text: "", orgId: newId, type: "add", pid: id, readonly: true, editStatus: true, delable: false, addible: false };
                        if (v.children) {
                            return v.children.unshift(node)
                        } else {
                            return v.children = [node];
                        }
                    }
                    if (v.children) {
                        searchTree(v.children)
                    }
                }
            }

            let { data, expandedKeys } = that.state;
            searchTree(data);

            that.setState({ data, expandedKeys: expandedKeys.concat([id]) })
            event.stopPropagation()
        }

        return (
            <Tree expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                autoExpandParent={false}
                onExpand={this.handleExpand.bind(this)}
                onSelect={this.handleSelected.bind(this)}
            >
                {
                    loop(data)
                }
            </Tree>
        )
    }
}