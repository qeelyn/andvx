import uniqueId from '@form-create/utils/lib/unique';

const label = '穿梭框';
const name = 'transfer';

const generateData = _ => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            title: `备选项 ${i}`,
            disabled: i % 4 === 0
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
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            props: {
                dataSource: generateData()
            }
        };
    },
    props() {
        return [
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'switch', field: 'oneWay', title: '展示为单向样式' },
            {
                type: 'group', field: 'operations', title: '操作文案集合，顺序从上至下',
                value: ['>', '<'],
                props: {
                    rule: [
                        { type: 'input', field: 'field1', title: '数值' },
                    ],
                    field: 'field1',
                }
            },
            { type: 'switch', field: 'showSearch', title: '是否显示搜索框' },
            { type: 'switch', field: 'showSelectAll', title: '是否展示全选勾选框', value: true },
        ];
    }
};