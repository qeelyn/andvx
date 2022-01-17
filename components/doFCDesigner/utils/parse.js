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

                //对真实的类型进行处理
                if (dataItem.realType) {
                    dataItem.type = dataItem.realType

                    if (dataItem.realType === 'group-table') {
                        if (!dataItem.props) {
                            dataItem.props = {}
                        }
                        dataItem.props.childRule = [...dataItem.children];
                        delete dataItem.realType
                        delete dataItem.children
                    } else if (dataItem.realType === 'group') {
                        if (!dataItem.props) {
                            dataItem.props = {}
                        }
                        dataItem.props.rule = [...dataItem.children];
                        delete dataItem.realType
                        delete dataItem.children
                    }
                }
            })
        } else {
            for (let key in rules) {
                initRules(rules[key], dictionary)
            }
        }
    }
}