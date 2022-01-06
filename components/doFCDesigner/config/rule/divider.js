const label = '分割线';
const name = 'a-divider';

export default {
    icon: 'icon-divider',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            wrap: { show: false },
            native: false,
            children: [''],
        };
    },
    props() {
        return [
            {
                type: 'input',
                field: 'formCreateChild',
                title: '文本',
                value: '',
            },
            {
                type: 'select',
                field: 'type',
                title: '水平还是垂直类型',
                value: "horizontal",
                options: [
                    { label: 'horizontal', value: 'horizontal' },
                    { label: 'vertical', value: 'vertical' },
                ]
            },
            {
                type: 'select',
                field: 'orientation',
                title: '设置分割线文案的位置',
                value: 'center',
                options: [
                    { label: 'left', value: 'left' },
                    { label: 'right', value: 'right' },
                    { label: 'center', value: 'center' }
                ]
            },
            { type: 'switch', field: 'dashed', title: '虚线', value: false },
            { type: 'switch', field: 'plain', title: '文字是否显示为普通正文样式', value: false },
        ];
    }
};