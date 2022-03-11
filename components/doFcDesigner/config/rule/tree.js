import uniqueId from '@form-create/utils/lib/unique';

const label = '树形控件';
const name = 'tree';
const dataSource = [{
    key: 1,
    title: '一级 1',
    children: [{
        key: 4,
        title: '二级 1-1',
        children: [{
            key: 9,
            title: '三级 1-1-1'
        }, {
            key: 10,
            title: '三级 1-1-2'
        }]
    }]
}, {
    key: 2,
    title: '一级 2',
    children: [{
        key: 5,
        title: '二级 2-1'
    }, {
        key: 6,
        title: '二级 2-2'
    }]
}, {
    key: 3,
    title: '一级 3',
    children: [{
        key: 7,
        title: '二级 3-1'
    }, {
        key: 8,
        title: '二级 3-2'
    }]
}]

export default {
    icon: 'icon-tree',
    label,
    name,
    rule() {
        return {
            type: 'a-tree',
            field: uniqueId(),
            title: label,
            options: dataSource,
            optionsTo: 'props.treeData'
        };
    },
    props() {
        return [
            { type: 'switch', field: 'blockNode', title: '是否节点占据一行' },
            {
                type: 'object', field: 'fieldNames', title: '替换title,key,children 字段',
                props: {
                    rule: [
                        { type: 'input', field: 'children', title: '子节点children', value: "children" },
                        { type: 'input', field: 'title', title: '标题title', value: "title" },
                        { type: 'input', field: 'key', title: '唯一标识key', value: "key" },
                    ],
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                }
            },
            { type: 'switch', field: 'autoExpandParent', title: '是否自动展开父节点', value: true },
            { type: 'switch', field: 'checkable', title: '节点前添加复选框' },
            { type: 'switch', field: 'checkStrictly', title: 'checkable状态下节点选择完全受控' },
            { type: 'switch', field: 'defaultExpandAll', title: '默认展开所有树节点' },
            { type: 'switch', field: 'disabled', title: '将树禁用' },
            { type: 'switch', field: 'draggable', title: '设置节点可拖拽' },
            { type: 'switch', field: 'multiple', title: '支持点选多个节点' },
            { type: 'switch', field: 'selectable', title: '是否可选中', value: true },
            { type: 'switch', field: 'showIcon', title: 'title 前的图标' },
            { type: 'switch', field: 'showLine', title: '是否展示连接线' },
        ];
    }
};