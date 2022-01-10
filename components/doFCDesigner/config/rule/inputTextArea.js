import uniqueId from '@form-create/utils/lib/unique';

const label = '文本框';
const name = 'a-textarea';

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
            { type: 'switch', field: 'showCount', title: '是否展示字数' },
            { type: 'switch', field: 'allowClear', title: '是否可清空' },
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
            // 一样存在 watchCtx找不到
            {
                type: 'select',
                field: 'autosizeValueType',
                title: 'autosize值类型',
                value: 'boolean',
                options: [
                    { label: 'boolean', value: 'boolean' },
                    { label: 'object', value: 'object' },
                ],
                control: [
                    {
                        value: 'boolean',
                        rule: [
                            { type: 'switch', field: 'autosize', title: '自适应内容高度', value: false },
                        ]
                    },
                    {
                        value: 'object',
                        rule: [
                            {
                                type: 'object', field: 'autosize', title: '自适应内容高度',
                                value: { minRows: 2, maxRows: 6 },
                                props: {
                                    rule: [
                                        { type: 'inputNumber', field: 'minRows', title: '最小Rows' },
                                        { type: 'inputNumber', field: 'maxRows', title: '最大Rows' },
                                    ],
                                    options: {
                                        form: {
                                            layout: "vertical",
                                        },
                                        submitBtn: false,
                                    },
                                }
                            },
                        ],

                    }
                ]
            },
        ];
    }
};