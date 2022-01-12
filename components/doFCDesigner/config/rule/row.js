const label = '栅格布局';
const name = 'row';

export default {
    icon: 'icon-row',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            children: []
        };
    },
    children: 'col',
    props() {
        return [
            {
                type: 'select',
                field: 'align',
                title: 'flex 布局下的垂直排列方式',
                value: 'top',
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'middle', value: 'middle' },
                    { label: 'bottom', value: 'bottom' }
                ]
            },
            { type: 'inputNumber', field: 'gutter', title: '栅格间隔' },
            {
                type: 'select',
                field: 'justify',
                title: 'flex 布局下的水平排列方式',
                value: 'start',
                options: [
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' },
                    { label: 'center', value: 'center' },
                    { label: 'space-around', value: 'space-around' },
                    { label: 'space-between', value: 'space-between' }
                ]
            },
            {
                type: 'switch',
                field: 'wrap',
                title: '是否自动换行',
            },
            {
                type: 'switch',
                field: 'formCreateIsGroup',
                title: '是否组成一个Group',
                control: [
                    {
                        value: true,
                        rule: [
                            {
                                type: 'a-divider',
                                children: ['group数据配置']
                            },
                            {
                                type: 'object', title: '', field: 'formCreateGroupConfig',
                                props: {
                                    options: {
                                        form: {
                                            layout: "vertical",
                                        },
                                        submitBtn: false,
                                    },
                                    rule: [
                                        { type: 'input', field: 'field', title: '字段field', info: '必须填写' },
                                        {
                                            type: 'object', title: 'group配置', field: 'props',
                                            props: {
                                                options: {
                                                    form: {
                                                        layout: "vertical",
                                                    },
                                                    submitBtn: false,
                                                },
                                                rule: [
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
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
        ];
    }
};