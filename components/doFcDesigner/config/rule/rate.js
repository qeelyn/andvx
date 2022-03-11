import uniqueId from '@form-create/utils/lib/unique';

const label = '评分';
const name = 'rate';

export default {
    icon: 'icon-rate',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {},
        };
    },
    props() {
        // clearable
        return [
            { type: 'switch', field: 'allowClear', title: '是否允许再次点击后清除', value: true },
            { type: 'switch', field: 'allowHalf', title: '是否允许半选' },
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'disabled', title: '是否为只读' },
            { type: 'inputNumber', field: 'count', title: 'star 总数', value: 5 },

            {
                type: 'group', field: 'tooltips', title: '自定义每项的提示信息',
                props: {
                    rule: [{ type: 'input', field: 'field1', title: '提示信息', value: '' }],
                    field: 'field1',
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                }
            },
        ];
    }
};