import uniqueId from '@form-create/utils/lib/unique';

const label = '树形控件';
const name = 'tree';

export default {
    icon: 'icon-tree',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            effect: {
                fetch: ''
            },
            props: {
                props: {
                    label: 'label',
                },
                showCheckbox: true,
                nodeKey: 'id',
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }]
            },
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
                    ]
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