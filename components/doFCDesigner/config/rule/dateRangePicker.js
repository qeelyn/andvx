import uniqueId from '@form-create/utils/lib/unique';

const label = '范围日期选择';
const name = 'dateRangePicker';

export default {
    icon: 'icon-date',
    label,
    name,
    rule() {
        return {
            type: 'a-range-picker',
            field: uniqueId(),
            title: label,
            modelField: 'value',
            style: 'width:100%',
        };
    },
    props() {
        return [
            {
                type: 'group', field: 'allowEmpty', title: '允许起始项部分为空',
                value: [false, false],
                props: {
                    min: 2,
                    max: 2,
                    rule: [{ type: 'switch', field: 'field1', title: '', value: false }],
                    field: 'field1',
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                }
            },
            {
                type: 'group', field: 'disabled', title: '禁用起始项',
                value: [false, false],
                props: {
                    min: 2,
                    max: 2,
                    rule: [{ type: 'switch', field: 'field1', title: '', value: false }],
                    field: 'field1',
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                }
            },
            {
                type: 'input',
                field: 'format',
                info: "YYYY-MM-DD HH:mm:ss",
                value: 'YYYY-MM-DD HH:mm:ss'
            },

            { type: 'switch', field: 'showTime', title: '增加时间选择功能', value: false },



            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'switch', field: 'inputReadOnly', title: '设置输入框为只读', info: '避免在移动设备上打开虚拟键盘' },
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
                    { label: 'middle', value: 'middle' },
                ]
            },


        ];
    }
};