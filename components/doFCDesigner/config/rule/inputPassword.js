import uniqueId from '@form-create/utils/lib/unique';

const label = '密码框';
const name = 'a-input-password';

export default {
    icon: 'icon-input',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {}
        };
    },
    props() {
        return [
            { type: 'input', field: 'placeholder', title: '输入框占位文本' },
            { type: 'switch', field: 'allowClear', title: '是否可清空' },
            { type: 'switch', field: 'visibilityToggle', title: '是否显示切换按钮', value: true },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'input', field: 'id', title: '输入框的 id' },
            { type: 'inputNumber', field: 'maxlength', title: '最大输入长度' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: 'default',
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            },
        ];
    }
};