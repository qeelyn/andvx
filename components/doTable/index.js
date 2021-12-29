import DeoTable from "./doTable.vue";
import { Table } from 'ant-design-vue'
import { defineComponent, h, toRefs, ref, computed, onMounted, watch } from 'vue'
import { useStore } from "vuex";

export default defineComponent({
    props: {
        setting: { type: Boolean, default: true },
        vuexCode: { type: String, default: location.pathname },
    },
    setup(props, context) {
        const { setting, vuexCode } = toRefs(props),
            contextAttrs = ref(context.attrs),
            store = useStore(),
            tableProps = ref({});

        const curTableHeader = computed(() => {
            if (store.state.andvx.tableHeader) {
                return store.getters["andvx/getTableHeader"](vuexCode.value);
            } else {
                return null;
            }
        })

        const getNewColumns = () => {
            // 对fixed特殊处理
            let tableColumns = [],
                contextAttrsColumns = [...contextAttrs.value.columns],
                allKeys = contextAttrsColumns.filter(item => !item.fixed).map(item => item.dataIndex);

            // 最左边
            tableColumns = [].concat(tableColumns, contextAttrsColumns.filter(item => item.fixed === 'left'));
            // 处理中间部分
            if (setting.value && curTableHeader.value && curTableHeader.value.length) {
                curTableHeader.value.forEach(item => {
                    if (item.checked && allKeys.includes(item.key)) {
                        tableColumns.push(
                            contextAttrsColumns.find((child) => child.dataIndex === item.key)
                        )
                    }
                })
            } else {
                tableColumns = [].concat(tableColumns, contextAttrsColumns.filter(item => !item.fixed));
            }
            // 最左边
            tableColumns = [].concat(tableColumns, contextAttrsColumns.filter(item => item.fixed === 'right'));

            return tableColumns;
        }, updateProps = () => {
            // table的赋值处理
            for (let key in contextAttrs.value) {
                // 判断这次循环是否更新  避免对无变化进行更新
                let isUpdate = false;
                if (typeof contextAttrs.value[key] === typeof tableProps.value[key]) {
                    if (typeof contextAttrs.value[key] != 'object') {
                        if (contextAttrs.value[key] !== tableProps.value[key]) {
                            isUpdate = true;
                        }
                    } else {
                        if (JSON.stringify(contextAttrs.value[key]) !== JSON.stringify(tableProps.value[key])) {
                            isUpdate = true;
                        }
                    }
                } else {
                    isUpdate = true;
                }
                if (isUpdate) {
                    if (key === 'columns') {
                        tableProps.value[key] = getNewColumns();
                    } else {
                        tableProps.value[key] = contextAttrs.value[key]
                    }
                }
            }
        };

        onMounted(updateProps)

        watch(curTableHeader, () => {
            tableProps.value.columns = getNewColumns()
        }, { deep: true })

        watch(contextAttrs, () => {
            updateProps();
        }, { deep: true })

        return () => h(DeoTable,
            {
                setting: setting.value,
                columns: [...contextAttrs.value.columns],
                vuexCode: vuexCode.value,
            },
            {
                default: () => h(Table, tableProps.value, context.slots)
            }
        )
    },
});