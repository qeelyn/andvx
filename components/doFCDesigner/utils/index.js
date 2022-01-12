export function makeOptionsRule(to) {
    return {
        type: 'radio',
        title: '选项数据',
        field: '_optionType',
        value: 0,
        options: [
            { 'label': '静态数据', 'value': 0 },
            { 'label': '接口数据', 'value': 1 },
        ],
        props: {
            type: 'button'
        },
        control: [
            {
                value: 0,
                rule: [],
            },
            {
                value: 1,
                rule: [
                    {
                        type: 'Fetch',
                        field: 'formCreateEffect>fetch',
                        props: {
                            to
                        }
                    }
                ]
            }
        ]

    };
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}

// 对数据源的处理
export function dataSourceConfig(field = 'formCreateOptions') {
    return [{
        type: 'a-divider',
        children: ['数据选项配置']
    }, {
        type: 'select',
        field: 'formCreateDataSourceType',
        title: '数据来源',
        value: 'option',
        options: [
            { label: '数据源', value: 'option' },
            { label: '字典', value: 'dictionary' },
        ],
        control: [
            {
                value: 'option',
                rule: [
                    {
                        type: 'group',
                        field: field,
                        native: true,
                        props: {
                            options: {
                                form: {
                                    layout: "vertical",
                                },
                                submitBtn: false,
                            },
                            rule: [
                                {
                                    type: 'input',
                                    field: 'label',
                                    title: '选项名称',
                                },
                                {
                                    type: 'input',
                                    field: 'value',
                                    title: '选项值',
                                },
                            ]
                        }
                    }
                ]
            },
            {
                value: 'dictionary',
                rule: [
                    {
                        type: 'object',
                        field: 'formCreateTypeCodes',
                        native: true,
                        props: {
                            options: {
                                form: {
                                    layout: "vertical",
                                },
                                submitBtn: false,
                            },
                            rule: [
                                {
                                    type: 'input',
                                    field: 'code',
                                    title: '数据源来源CODE',
                                },
                                {
                                    type: 'input',
                                    field: 'value',
                                    title: '数据源项Key',
                                },
                                {
                                    type: 'input',
                                    field: 'label',
                                    title: '数据源项Label',
                                },
                            ]
                        }
                    },
                ]
            }
        ]
    }]
}