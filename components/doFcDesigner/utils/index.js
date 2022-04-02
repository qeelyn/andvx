
export function makeOptionsRule(to) {
    return {
        type: 'radio',
        title: '数据来源',
        field: 'formCreateDataSourceType',
        value: 'options',
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
                        type: 'struct',
                        field: 'formCreate' + upper(to).replace('.', '>'),
                        props: { defaultValue: [] }
                    },
                ],
            },
            {
                value: 'fetch',
                rule: [
                    {
                        type: 'fetch',
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

// 增加事件设置  但感觉事件没啥用
export function makeEventRule(events = []) {
    return {
        type: 'object',
        title: '事件',
        field: 'formCreateOn',
        props: {
            rule: [{
                type: 'a-space',
                children: events.map(item => {
                    return {
                        type: 'struct',
                        field: item,
                        native: true,
                        props: {
                            title: `事件:${item}`,
                            defaultValue: () => { }
                        }
                    }
                })
            }]
        },
    };
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}