
export function makeOptionsRule(to) {
    return {
        type: 'radio',
        title: '数据来源',
        field: 'formCreateDataSourceType',
        value: 0,
        options: [
            { 'label': '静态数据', 'value': 'options' },
            { 'label': '接口数据', 'value': 'fetch' },
            { label: '字典', value: 'dictionary' },
        ],
        props: {
            optionType: 'button'
        },
        control: [
            {
                value: 'options',
                rule: [
                    {
                        type: 'Struct',
                        field: 'formCreate' + upper(to).replace('.', '>'),
                        props: { defaultValue: [] }
                    },
                ],
            },
            {
                value: 'fetch',
                rule: [
                    {
                        type: 'Fetch',
                        field: 'formCreateEffect>fetch',
                        props: {
                            to
                        }
                    }
                ]
            }, {
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

    };
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}