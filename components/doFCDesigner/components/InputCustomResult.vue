<template>
    <a-input v-model:value="dValue" :placeholder="placeholder" allowClear :disabled="disabled">
        <template #addonAfter>
            <a-select
                v-model:value="resultType"
                :disabled="disabled || valueTypes.length <= 1"
                style="width: 100px"
            >
                <a-select-option v-for="item in valueTypes" :value="item" :key="item">{{ item }}</a-select-option>
            </a-select>
        </template>
    </a-input>
</template>
<script>
import { defineComponent, ref, toRefs, watch } from 'vue'
/**
 * 用来处理特殊结果
 */
export default defineComponent({
    name: 'input-custom-result',
    props: {
        // 输入的值
        modelValue: { default: null },
        disabled: { type: Boolean },
        placeholder: { type: String },
        // 转换结果值
        valueTypes: {
            type: Array,
            required: true,
            validator(values) {
                // 现支持类型
                const supportTypes = ['object', 'boolean', 'array', 'number', 'string'];
                let isTrue = true
                if (values.length) {
                    values.forEach(item => {
                        isTrue = supportTypes.includes(item);
                        if (!isTrue) {
                            return;
                        }
                    })
                } else {
                    isTrue = false
                }
                return isTrue
            }
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { modelValue, valueTypes } = toRefs(props),
            resultType = ref(),
            dValue = ref();

        if (valueTypes.value) {
            resultType.value = valueTypes.value[0]
        }

        const setDValue = () => {
            // 设置展示的值
            let value = null;
            if (modelValue.value === null || modelValue.value === undefined || modelValue.value === '') {
                value = null;
            } else {
                // dValue 值比如是string
                if (typeof modelValue.value === 'object') {
                    value = JSON.stringify(modelValue.value)
                } else {
                    value = `${modelValue.value}`;
                }
            }
            dValue.value = value;
        }, resultValue = (isForced) => {
            // 设置真实拿到的值
            let value = null, isUpdate = false;
            if (dValue.value) {
                switch (resultType.value) {
                    case 'object':
                        try {
                            if (dValue.value[0] === '{') {
                                value = JSON.parse(dValue.value);
                                isUpdate = true;
                            }
                        } catch (error) {
                        }
                        break;
                    case 'array':
                        try {
                            if (dValue.value[0] === '[') {
                                value = JSON.parse(dValue.value);
                                isUpdate = true;
                            }
                        } catch (error) {
                        }
                        break;
                    case 'boolean':
                        if (dValue.value === 'false') {
                            value = false;
                            isUpdate = true;
                        } else if (dValue.value === 'true') {
                            value = true;
                            isUpdate = true;
                        }
                        break;
                    case 'number':
                        if (!isNaN(Number(dValue.value))) {
                            value = Number(dValue.value);
                            isUpdate = true;
                        }
                        break;
                    case 'string':
                        value = dValue.value;
                        isUpdate = true;
                        break;
                    default:
                        break;
                }
            } else {
                isUpdate = true;
            }

            if (isUpdate) {
                emit('update:modelValue', value)
            } else if (isForced) {
                emit('update:modelValue', value)
            }

        }

        setDValue();

        watch(modelValue, () => {
            setDValue();
        }, {
            deep: true
        })

        watch(resultType, () => {
            resultValue(true)

        }, {
            deep: true
        })

        watch(dValue, () => {
            resultValue()
        })

        return {
            dValue,
            resultType
        }
    }
});
</script>