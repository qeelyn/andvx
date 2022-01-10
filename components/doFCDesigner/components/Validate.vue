<template>
    <FormCreate class="_fc-validate" :rule="rule" :option="option" v-model="formValue" />
</template>

<script>
import { defineComponent, ref, toRefs, watch } from 'vue'
import formCreate from "@form-create/ant-design-vue";

export default defineComponent({
    name: 'Validate',
    components: {
        FormCreate: formCreate.$form(),
    },
    props: {
        modelValue: { type: Array }
    },
    setup(props, { emit }) {
        const { modelValue } = toRefs(props),
            formValue = ref(),
            option = ref({
                form: {
                    layout: "vertical",
                },
                submitBtn: false,
                formData: null
            }),
            rule = ref([
                {
                    type: 'select',
                    field: 'type',
                    title: '字段类型',
                    props: {
                        allowClear: true,
                    },
                    options: [
                        { value: 'string', label: 'String' },
                        { value: 'array', label: 'Array' },
                        { value: 'number', label: 'Number' },
                        { value: 'integer', label: 'Integer' },
                        { value: 'float', label: 'Float' },
                        { value: 'object', label: 'Object' },
                        { value: 'date', label: 'Date' },
                        { value: 'url', label: 'url' },
                        { value: 'hex', label: 'hex' },
                        { value: 'email', label: 'email' },
                    ],
                    control: [
                        {
                            handle: v => {
                                return !!v;
                            },
                            rule: [
                                {
                                    type: 'group',
                                    field: 'validateGroup',
                                    value: [],
                                    props: {
                                        expand: 1,
                                        rule: [
                                            {
                                                type: 'select',
                                                title: '触发方式',
                                                field: 'trigger',
                                                value: 'change',
                                                options: [
                                                    { label: 'change', value: 'change' },
                                                    { label: 'submit', value: 'submit' },
                                                    { label: 'blur', value: 'blur' },
                                                ]
                                            },
                                            {
                                                type: 'select',
                                                title: '验证方式',
                                                field: 'mode',
                                                options: [
                                                    { value: 'required', label: '必填' },
                                                    { value: 'pattern', label: '正则表达式' },
                                                    { value: 'min', label: '最小值' },
                                                    { value: 'max', label: '最大值' },
                                                    { value: 'len', label: '长度' },
                                                ],
                                                value: null,
                                                control: [
                                                    {
                                                        value: 'required',
                                                        rule: [
                                                            {
                                                                type: 'hidden',
                                                                field: 'required',
                                                                value: true
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        value: 'pattern',
                                                        rule: [
                                                            {
                                                                type: 'input',
                                                                field: 'pattern',
                                                                title: '正则表达式'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        value: 'min',
                                                        rule: [
                                                            {
                                                                type: 'inputNumber',
                                                                field: 'min',
                                                                title: '最小值'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        value: 'max',
                                                        rule: [
                                                            {
                                                                type: 'inputNumber',
                                                                field: 'max',
                                                                title: '最大值'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        value: 'len',
                                                        rule: [
                                                            {
                                                                type: 'inputNumber',
                                                                field: 'len',
                                                                title: '长度'
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                type: 'input',
                                                title: '错误信息',
                                                field: 'message',
                                                value: '',
                                            }
                                        ],
                                        options: {
                                            form: {
                                                layout: "vertical",
                                            },
                                            submitBtn: false,
                                        },
                                    },
                                }
                            ]
                        }
                    ]
                },
            ])

        const onInput = () => {
            let val = [];
            const { validateGroup, type } = formValue.value;
            if (type && !validateGroup) {
                return;
            } else if (type) {
                validateGroup.forEach(v => {
                    v.type = type;
                });
                val = [...validateGroup];
            }
            emit('update:modelValue', val);
        }, parseValue = (n) => {
            let val = {
                validateGroup: n ? [...n] : [],
                type: n.length ? n[0].type : null
            };
            val.validateGroup.forEach(v => {
                if (!v.mode) {
                    Object.keys(v).forEach(k => {
                        if (['message', 'type', 'trigger', 'mode'].indexOf(k) < 0) {
                            v.mode = k;
                        }
                    });
                }
            });

            return val;

        }

        option.value.formData = parseValue(modelValue.value ? modelValue.value : [])

        watch(formValue, () => {
            onInput()
        }, {
            deep: true
        })

        watch(modelValue, (n) => {
            formValue.value = parseValue(n);
        }, {
            deep: true
        })

        return {
            rule,
            option,
            formValue,
        }
    }
});
</script>

<style>
._fc-validate .form-create .ant-form-item {
    margin-bottom: 22px !important;
}
</style>