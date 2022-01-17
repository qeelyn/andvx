import uniqueId from '@form-create/utils/lib/unique';

const label = '穿梭框';
const name = 'transfer';

const generateData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i.toString(),
            title: `content${i + 1}`,
            name: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }
    return data;
};

export default {
    icon: 'icon-transfer',
    label,
    name,
    rule() {
        return {
            type: 'a-transfer',
            field: uniqueId(),
            title: label,
            props: {
                render: (item) => item.title
            },
            options: generateData(),
            optionsTo: 'props.dataSource'
        };
    },
    props() {
        return [
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'switch', field: 'oneWay', title: '展示为单向样式' },
            {
                type: 'group', field: 'operations', title: '操作文案集合，顺序从上至下',
                value: ['', ''],
                props: {
                    min: 2,
                    max: 2,
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                    rule: [
                        { type: 'input', field: 'field1', title: '文案' },
                    ],
                    field: 'field1',
                }
            },
            { type: 'switch', field: 'showSearch', title: '是否显示搜索框' },
            { type: 'switch', field: 'showSelectAll', title: '是否展示全选勾选框', value: true },
            {
                type: 'group', field: 'titles', title: '标题集合，顺序从左至右',
                value: ['', ''],
                props: {
                    min: 2,
                    max: 2,
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                    rule: [
                        { type: 'input', field: 'field1', title: '文案' },
                    ],
                    field: 'field1',
                }
            },
        ];
    }
};