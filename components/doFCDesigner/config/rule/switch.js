import uniqueId from '@form-create/utils/lib/unique';

const label = '开关';
const name = 'switch';

export default {
    icon: 'icon-switch',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            props: {},
        };
    },
    props() {
        return [
            { type: 'switch', field: 'autofocus', title: '组件自动获取焦点' },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'switch', field: 'loading', title: '加载中的开关' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: 'default',
                options: [
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            },
            { type: 'input', field: 'checkedChildren', title: '选中时的内容' },
            { type: 'input', field: 'unCheckedChildren', title: '非选中时的内容' },
            // { type: 'input', field: 'checkedValue', title: '选中时的值' },
            // { type: 'input', field: 'unCheckedValue', title: '非选中时的值' },
        ];
    }
};