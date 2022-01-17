import uniqueId from '@form-create/utils/lib/unique';

const label = '数组';
const name = 'group';

export default {
    icon: 'icon-row',
    label,
    name,
    drag: true,
    rule() {
        return {
            type: 'div',
            realType: 'group',
            field: uniqueId(),
            title: label,
            props: {
                options: {
                    form: {
                        layout: "vertical",
                    },
                    submitBtn: false,
                },
            },
            children: []
        };
    },
    props() {
        return [
            { type: 'inputNumber', field: 'expand', title: '默认展开几项' },
            { type: 'inputNumber', field: 'min', title: '最少添加几项' },
            { type: 'inputNumber', field: 'max', title: '最多添加几项' },
            { type: 'inputNumber', field: 'fontSize', title: '操作按钮字体大小', value: 28 },
            { type: 'switch', field: 'disabled', title: '禁用' },
            {
                type: 'input-custom-result',
                field: 'options',
                title: '子表单配置',
                props: {
                    valueType: 'object'
                },
                value: {
                    form: {
                        layout: "vertical",
                    },
                    submitBtn: false,
                }
            },
        ];
    }
};