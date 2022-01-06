const label = '按钮';
const name = 'button';

export default {
    icon: 'icon-button',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            children: ['按钮'],
        };
    },
    props() {
        return [
            {
                type: 'input',
                field: 'formCreateChild',
                title: '内容',
            },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: "middle",
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'middle', value: 'middle' }
                ]
            },
            {
                type: 'select',
                field: 'type',
                title: '类型',
                value: "default",
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'ghost', value: 'ghost' },
                    { label: 'dashed', value: 'dashed' },
                    { label: 'link', value: 'link' },
                    { label: 'text', value: 'text' },
                    { label: 'default', value: 'default' },
                ]
            },
            {
                type: 'select',
                field: 'shape',
                title: '按钮形状',
                props: {
                    allowClear: true,
                },
                options: [
                    { label: 'circle', value: 'circle' },
                    { label: 'round', value: 'round' },
                ]
            },


            { type: 'switch', field: 'ghost', title: '幽灵属性，使按钮背景透明' },
            { type: 'switch', field: 'danger', title: '设置危险按钮' },
            { type: 'switch', field: 'block', title: '将按钮宽度调整为其父宽度的选项' },
            {
                type: 'select',
                field: 'htmlType',
                title: '设置button原生的type',
                value: "button",
                options: [
                    { label: 'button', value: "button" },
                    { label: 'submit', value: 'submit' },
                    { label: 'reset', value: 'reset' },
                ]
            },
            { type: 'switch', field: 'disabled', title: '是否禁用状态' },
            {
                type: 'switch',
                field: 'loading',
                title: '是否加载中状态'
            },
            {
                type: 'input',
                field: 'target',
                title: '相当于 a 链接的 target 属性',
                value: "_self"
            },
            {
                type: 'input',
                field: 'href',
                title: '点击跳转的地址行为和 a 链接一致',
                value: ""
            },

        ];
    }
};