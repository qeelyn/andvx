<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <p>自定义结果处理:</p>
            <a-select ref="select" v-model:value="typeValue">
                <a-select-option v-for="item in typeList" :value="item">{{ item }}</a-select-option>
            </a-select>
            <InputCustomResult v-model="testValue" :valueType="typeValue" />
            <div>
                值
                {{ testValue }}
                、值类型 {{ getTypeName() }}
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import InputCustomResult from "../../../components/doFCDesigner/components/InputCustomResult.vue";

export default defineComponent({
    components: { Breadcrumb, InputCustomResult },
    setup() {
        const testValue = ref({ a: 1 }),
            typeValue = ref('object'),
            typeList = ref(['object', 'boolean', 'array', 'number', 'string']);

        const getTypeName = () => {
            let name = '';
            if (testValue.value === undefined) {
                name = 'undefined';
            } else if (testValue.value === null) {
                name = 'null';
            } else if (Array.isArray(testValue.value)) {
                name = 'array';
            } else {
                name = typeof testValue.value
            }
            return name
        }

        return {
            testValue,
            typeValue,
            typeList,
            getTypeName
        };
    },
});
</script>
