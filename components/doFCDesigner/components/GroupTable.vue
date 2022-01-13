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
                            :rule="getRowRule(column.dataIndex, record[column.dataIndex])"
                            :option="fOption"
                            @change="(field, value) => setValue(field, value, index)"
                        />
                    </template>
                </template>
            </a-table>
        </a-form-item-rest>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, nextTick, watch } from 'vue'
import formCreate from "@form-create/ant-design-vue";
import { deepCopy } from "@form-create/utils/lib/deepextend";

export default defineComponent({
    components: {
        FormCreate: formCreate.$form(),
    },
    name: 'group-table',
    props: {
        modelValue: { type: Array },
        childRule: { type: Array },
        // 几个开放设置处理
        rowKey: { type: String, default: 'key' },
        bordered: { type: Boolean },
        showHeader: { type: Boolean, default: true },
        size: { type: String, default: 'default' },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { childRule, modelValue } = toRefs(props),
            columns = ref([]),
            fOption = ref({ form: { layout: 'vertical' }, submitBtn: false }),
            // 在初始化、列变更的时候处理
            dataSource = ref([]),
            // 由于dataSource的变化会导致table #bodyCell重新渲染 因此用来保持和modelValue同步的数据
            modelValueSource = ref(modelValue.value ? modelValue.value : []);

        columns.value = [
            { title: '序号', dataIndex: 'serialNumber', align: 'center', fixed: 'left', width: 80 },
            ...childRule.value.map(item => {
                return {
                    title: item.title, dataIndex: item.field, width: 200,
                }
            }),
            { title: '操作', dataIndex: 'actions', align: 'center', fixed: 'right', width: 80 },
        ]

        const getRowRule = (field, value) => {
            let rule = deepCopy(childRule.value.find(item => item.field === field));
            rule.native = true;
            rule.value = value
            return rule ? [rule] : [];
        }, addRow = () => {
            modelValueSource.value.push({})
            updateDataSource();
        }, delRow = (index) => {
            modelValueSource.value.splice(index, 1);
            updateDataSource();
        }, setValue = (field, value, index) => {
            modelValueSource.value[index][field] = value;
        }, updateDataSource = () => {
            nextTick(() => {
                dataSource.value = modelValue.value ? deepCopy(modelValue.value) : [];
            })
        }

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
        }
    },
});
</script>