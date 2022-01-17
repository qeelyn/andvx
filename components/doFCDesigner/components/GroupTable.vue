<template>
    <div style="width:100%">
        <a-form-item-rest>
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
                        <a @click="addRow">添加</a>
                    </template>
                </template>
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.dataIndex === 'serialNumber'">{{ index + 1 }}</template>
                    <template v-else-if="column.dataIndex === 'actions'">
                        <a @click="delRow(index)">删除</a>
                    </template>
                    <template v-else-if="column.dataIndex">
                        <FormCreate
                            :key="`${column.dataIndex}-${index}`"
                            :rule="getRowRule(column.dataIndex, record[column.dataIndex])"
                            :option="fOption"
                            @update:api="($f) => add$f(column.dataIndex, index, $f)"
                            @change="(field, value) => setValue(field, value, index)"
                        />
                    </template>
                </template>
            </a-table>
        </a-form-item-rest>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, nextTick, watch, inject, h } from 'vue'
import { deepCopy } from "@form-create/utils/lib/deepextend";
import formCreate from "@form-create/ant-design-vue";

export default defineComponent({
    components: {
        FormCreate: formCreate.$form(),
    },
    name: 'group-table',
    props: {
        modelValue: { type: Array },
        rule: { type: Array },
        // 几个开放设置处理
        rowKey: { type: String, default: 'key' },
        bordered: { type: Boolean },
        showHeader: { type: Boolean, default: true },
        size: { type: String, default: 'default' },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const formCreateInject = inject('formCreateInject'),
            { rule, modelValue } = toRefs(props),
            columns = ref([]),
            subForms = ref([]),
            fOption = ref({ form: { layout: 'vertical' }, submitBtn: false }),
            // 在初始化、列变更的时候处理
            dataSource = ref([]),
            // 由于dataSource的变化会导致table #bodyCell重新渲染 因此用来保持和modelValue同步的数据
            modelValueSource = ref(modelValue.value ? modelValue.value : []);

        columns.value = [
            { title: '序号', dataIndex: 'serialNumber', align: 'center', fixed: 'left', width: 80 },
            ...rule.value.map(item => {
                return {
                    title: item.title, dataIndex: item.field, width: 200,
                }
            }),
            { title: '操作', dataIndex: 'actions', align: 'center', fixed: 'right', width: 80 },
        ]

        const getRowRule = (field, value) => {
            const copyRule = deepCopy(rule.value.find(item => item.field === field));
            copyRule.title = null;
            copyRule.value = value
            return copyRule ? [copyRule] : [];
        }, addRow = () => {
            modelValueSource.value.push({})
            updateDataSource();
        }, delRow = (index) => {
            modelValueSource.value.splice(index, 1);
            Object.keys(subForms.value[index]).forEach(item => {
                delete subForms.value[index][item]
            })
            subForms.value.splice(index, 1);
            subForm();
            updateDataSource();
        }, setValue = (field, value, index) => {
            modelValueSource.value[index][field] = value;
        }, updateDataSource = () => {
            nextTick(() => {
                dataSource.value = modelValue.value ? deepCopy(modelValue.value) : [];
            })
        }, add$f = (field, index, $f) => {
            if (!subForms.value[index]) {
                subForms.value[index] = {};
            }
            subForms.value[index][field] = $f;
            subForm();
        }, subForm = () => {
            let allSubForm = [];
            subForms.value.forEach(item => {
                Object.keys(item).forEach(itemKey => {
                    allSubForm.push(item[itemKey]);
                })
            })
            formCreateInject.subForm(allSubForm);
        };

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