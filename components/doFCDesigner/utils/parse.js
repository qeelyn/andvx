/**
 * 1.处理通过数据源字典来设置数据的值
 * 
 * @param {object|array} rules
 * @param {*} dictionary 
 */
export function initRules(rules, dictionary) {
    if (rules && typeof rules === 'object') {
        if (Array.isArray(rules)) {
            rules.forEach((dataItem, dataIndex) => {

                // 对标准的字典列表处理
                if (dataItem.dataSourceType === 'dictionary') {
                    const { code, label, value } = dataItem.typeCodes
                    dataItem.options = dictionary[code].map(item => {
                        return {
                            label: item[label],
                            value: item[value],
                        }
                    })

                } else if (dataItem.children && dataItem.children.length) {
                    initRules(dataItem.children, dictionary)
                }

                // 对数组配置处理
                if (dataItem.isGroup) {
                    const newData = JSON.parse(JSON.stringify(dataItem)),
                        groupConfig = newData.groupConfig ? JSON.parse(JSON.stringify(newData.groupConfig)) : null;
                    rules.splice(dataIndex, 1);
                    delete newData.isGroup;
                    delete newData.groupConfig;
                    const groupRule = {
                        type: 'group',
                        props: {
                        },
                        ...groupConfig
                    }
                    groupRule.props.rule = [newData];
                    rules.splice(dataIndex, 0, groupRule);
                }
            })
        } else {
            for (let key in rules) {
                initRules(rules[key], dictionary)
            }
        }
    }
}