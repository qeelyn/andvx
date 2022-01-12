import uniqueId from '@form-create/utils/lib/unique';

const label = '计数器';
const name = 'inputNumber';

export default {
    icon: 'icon-number',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            style: 'width:100%'
        };
    },
    props() {
        return [
            { type: 'input', field: 'placeholder', title: '输入框占位文本' },
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'inputNumber', field: 'min', title: '最小值' },
            { type: 'inputNumber', field: 'max', title: '最大值' },
            { type: 'inputNumber', field: 'precision', title: '数值精度' },
            { type: 'input', field: 'decimalSeparator', title: '小数点' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                props: {
                    allowClear: true
                },
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                ]
            },
            { type: 'inputNumber', field: 'step', title: '计数器步长' },
            { type: 'switch', field: 'controls', title: '是否显示增减按钮', value: true },
            { type: 'switch', field: 'keyboard', title: '是否启用键盘快捷行为', value: true },
            { type: 'switch', field: 'stringMode', title: '开启后支持高精度小数', info: '同时 change 事件将返回 string 类型' },


        ];
    }
};