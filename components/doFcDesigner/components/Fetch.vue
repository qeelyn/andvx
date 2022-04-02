<template>
  <div class="_fc_fetch">
    <form-create v-model:api="fApi" v-model="fValue" :rule="rule" :option="option" />
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch, onMounted } from 'vue'
import formCreate from "@form-create/ant-design-vue";

export default defineComponent({
  name: 'Fetch',
  components: {
    FormCreate: formCreate.$form(),
  },
  props: {
    modelValue: { type: Object || String },
    to: { type: String },
    formcreateinject: { type: Object },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { to, modelValue } = toRefs(props),
      timeFn = ref(),
      fApi = ref({}),
      fValue = ref(modelValue.value ? modelValue.value : {}),
      option = ref({
        form: {
          layout: "vertical",
        },
        submitBtn: false,
      }),
      rule = ref([
        {
          type: 'input',
          field: 'action',
          title: '接口地址',
          // value: 'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json',
          validate: [{ required: true, message: '请输入接口地址' }]
        },
        {
          type: 'select',
          field: 'method',
          title: '请求方式',
          value: 'GET',
          options: [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
          ]
        },
        {
          type: 'select',
          field: 'dataType',
          title: '接口附带数据的提交方式',
          value: 'formData',
          options: [
            { label: 'json', value: 'json' },
            { label: 'formData', value: 'formData' },
            { label: 'text', value: 'text' },
            { label: 'xml', value: 'xml' },
          ]
        },
        {
          type: 'Struct',
          field: 'headers',
          title: 'header信息',
          value: {},
          props: {
            title: 'header信息'
          }
        },
        {
          type: 'Struct',
          field: 'data',
          title: '接口附带数据',
          value: {},
          props: {
            title: '接口附带数据'
          }
        },
        {
          type: 'Struct',
          field: 'parse',
          title: '结果解析函数 ',
          value: (res, rule, fapi) => res.rows.map(item => { return { label: item.name, value: item.adcode } }),
          props: {
            title: '结果解析函数'
          }
        },
        {
          type: 'input',
          field: 'to',
          title: '异步数据插入的位置',
          info: `例如:'options', 'props.options'`,
          value: to.value,
          validate: [{ required: true, message: '请输入异步数据插入的位置' }]
        },
      ])

    const fApiSubmit = () => {
      if (fApi.value) {
        fApi.value.submit((formData) => {
          emit('update:modelValue', formData);
        })
      }
    }

    watch(fValue, () => {
      clearTimeout(timeFn.value)
      timeFn.value = setTimeout(() => {
        fApiSubmit()
      }, 1500);
    })

    return {
      fApi,
      fValue,
      option,
      rule,
    }
  }
});
</script>
<style>
._fc_fetch .el-form-item__label {
  display: inline-block;
  /* float: left; */
  text-align: right;
  padding-right: 5px;
}

._fc_fetch {
  background-color: #bfdaf7;
  padding: 10px;
}
</style>