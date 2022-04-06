<template>
    <div style="width:100%">
        <a-table
            :columns="columns"
            :dataSource="dataSource"
            :scroll="{ x: 100, y: 500 }"
            :pagination="false"
            :rowKey="rowKey"
            :bordered="bordered"
            :showHeader="showHeader"
            :size="size"
            :setting="false"
        >
            <template #headerCell="{ column }">
                <template v-if="column.dataIndex === 'actions'">
                    <a @click="addRow" title="添加">
                        <plus-outlined />
                    </a>
                </template>
            </template>
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'serialNumber'">{{ index + 1 }}</template>
                <template v-else-if="column.dataIndex === 'actions'">
                    <a-space>
                        <a
                            :disabled="dataSource.length < 2 ? true : null"
                            @click="moveRow(index, 'up')"
                            title="上移"
                        >
                            <arrow-up-outlined />
                        </a>
                        <a
                            :disabled="dataSource.length < 2 ? true : null"
                            @click="moveRow(index, 'down')"
                            title="下移"
                        >
                            <arrow-down-outlined />
                        </a>
                        <a @click="delRow(index)" title="删除">
                            <delete-outlined />
                        </a>
                    </a-space>
                </template>
                <template v-else-if="column.dataIndex">
                    <form-create
                        :key="`${column.dataIndex}-${index}`"
                        :rule="getRowRule(column.dataIndex, record[column.dataIndex])"
                        :option="fOption"
                        @update:api="($f) => add$f(column.dataIndex, index, $f)"
                        @change="(field, value) => setValue(field, value, index)"
                    />
                </template>
                <template v-else>test{{ column.dataIndex }}</template>
            </template>
        </a-table>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, nextTick, watch } from 'vue'
import { Table, Space } from "ant-design-vue";
import { PlusOutlined, DeleteOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { deepCopy } from "@form-create/utils/lib/deepextend";
import formCreate from "@form-create/ant-design-vue";
import uniqueId from '@form-create/utils/lib/unique';

export default defineComponent({
    components: {
        ATable: Table, ASpace: Space, PlusOutlined, DeleteOutlined, ArrowDownOutlined, ArrowUpOutlined,
        FormCreate: formCreate.$form(),
    },
    name: 'groupTable',
    props: {
        modelValue: { type: Array },
        rule: { type: Array },
        // 几个开放设置处理
        isSerialNumber: { type: Boolean, default: true }, //不显示序号
        rowKey: { type: String, default: 'key' },
        bordered: { type: Boolean },
        showHeader: { type: Boolean, default: true },
        size: { type: String, default: 'default' },
        formCreateInject: { type: Object }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { rule, modelValue, isSerialNumber, rowKey, formCreateInject } = toRefs(props),
            columns = ref([]),
            subForms = ref([]),
            fOption = ref({ form: { layout: 'vertical' }, submitBtn: false }),
            // 在初始化、列变更的时候处理
            dataSource = ref([]),
            // 由于dataSource的变化会导致table #bodyCell重新渲染 因此用来保持和modelValue同步的数据
            modelValueSource = ref(modelValue.value ? modelValue.value : []);

        const tidyColumns = () => {
            // 整理表格columns的数据
            let columnAry = []
            if (isSerialNumber.value) {
                columnAry.push({ title: '序号', dataIndex: 'serialNumber', align: 'center', fixed: 'left', width: 80 })
            }
            rule.value.forEach(item => {
                columnAry.push(
                    {
                        title: item.title, dataIndex: item.field, width: 200,
                    }
                )
            })
            columnAry.push({ title: '操作', dataIndex: 'actions', align: 'center', fixed: 'right', width: 96 })
            columns.value = columnAry;
        }, getRowRule = (field, value) => {
            // 获取当前行的相应规则
            const copyRule = deepCopy(rule.value.find(item => item.field === field));
            copyRule.title = null;
            copyRule.value = value
            return copyRule ? [copyRule] : [];
        }, addRow = () => {
            // 添加
            modelValueSource.value.push({})
            updateDataSource();
        }, moveRow = (index, direction) => {
            // 上下移动
            let insertIndex = null, insertData = null, dataLength = modelValueSource.value.length;
            if (dataLength < 2) {
                return;
            }
            insertData = { ...modelValueSource.value[index] }
            if (direction === 'up') {
                insertIndex = index - 1;
                insertIndex = insertIndex < 0 ? dataLength - 1 : insertIndex
            } else if (direction === 'down') {
                insertIndex = index + 1;
                insertIndex = insertIndex < dataLength - 1 ? 0 : insertIndex
            }

            if (insertIndex !== null) {
                modelValueSource.value.splice(index, 1);
                modelValueSource.value.splice(insertIndex, 0, insertData);
                updateDataSource();
            }
        }, delRow = (index) => {
            // 删除行
            Object.keys(subForms.value[index]).forEach(key => {
                delete subForms.value[index][key];
            })
            subForms.value.splice(index, 1);
            subForm();
            modelValueSource.value.splice(index, 1);
            updateDataSource();
        }, setValue = (field, value, index) => {
            // 设置值 不调用updateDataSource是为了优化处理
            modelValueSource.value[index][field] = value;
        }, updateDataSource = () => {
            // 更新表格数据源
            nextTick(() => {
                if (modelValue.value) {
                    dataSource.value = modelValue.value.map((item) => {
                        const nItem = { ...item };
                        if (!nItem[rowKey.value]) {
                            nItem[rowKey.value] = uniqueId();
                        }
                        return nItem;
                    })
                } else {
                    dataSource.value = [];
                }
            })
        }, add$f = (field, index, $f) => {
            // 添加子表单
            if (!subForms.value[index]) {
                subForms.value[index] = {};
            }
            $f.keyidx = `${field}-${index}`;
            subForms.value[index][field] = $f;
            subForm();
        }, subForm = () => {
            // 更新所有子表单
            let allSubForm = [];
            subForms.value.forEach(item => {
                Object.keys(item).forEach(itemKey => {
                    allSubForm.push(item[itemKey]);
                })
            })
            formCreateInject.value.subForm(allSubForm);
        };

        tidyColumns()
        updateDataSource()

        watch(modelValue, () => {
            modelValueSource.value = modelValue.value ? modelValue.value : [];
        }, {
            deep: true
        })

        watch(modelValueSource, () => {
            emit('update:modelValue', modelValueSource.value);
        }, {
            deep: true
        })

        return {
            fOption,
            columns,
            dataSource,
            getRowRule,
            addRow,
            delRow,
            moveRow,
            setValue,
            add$f,
        }
    },
});
</script>
<style>
.group-table .ant-form-item-explain {
    position: absolute;
    top: 100%;
}
.group-table .form-create .ant-form-item {
    margin-bottom: 0;
}
</style>