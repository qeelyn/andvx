const label = '表格';
const name = 'table';

export default {
    icon: 'icon-tab',
    label,
    name,
    rule() {
        return {
            type: 'a-table',
            native: true,
            props: {
                columns: []
            },
            children: []
        };
    },
    props() {
        return [
            { type: 'input', field: 'rowKey', title: '表格行 key 的取值', value: 'key' },
            { type: 'switch', field: 'bordered', title: '是否展示外边框和列边框' },
            { type: 'switch', field: 'showHeader', title: '是否显示表头', value: true },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: 'default',
                options: [
                    { label: 'default ', value: 'default ' },
                    { label: 'middle', value: 'middle' },
                    { label: 'small', value: 'small' },
                ]
            },
            {
                type: 'a-divider',
                children: ['columns 列设置']
            },
            {
                type: 'group',
                field: 'columns',
                native: true,
                props: {
                    expand: 1,
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                    rule: [
                        { type: 'input', field: 'dataIndex', title: '唯一的Key' },
                        { type: 'input', field: 'title', title: '列头显示文字' },
                        { type: 'inputNumber', field: 'width', title: '列宽度' },
                        {
                            type: 'select', field: 'align', title: '列的对齐方式', value: "left",
                            options: [
                                { label: 'left', value: 'left' },
                                { label: 'right', value: 'right' },
                                { label: 'center', value: 'center' },
                            ]
                        },
                        { type: 'switch', field: 'ellipsis', title: '超过宽度将自动省略' },
                    ]
                }
            }


        ];
    }
};