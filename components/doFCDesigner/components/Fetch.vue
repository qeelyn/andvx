<template>
  <div class="_fc_fetch">
    <form-create
      v-model:api="fApi"
      :modelValue="fValue"
      :rule="rule"
      :option="option"
      @change="onChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed, onMounted } from 'vue'
import is from '@form-create/utils/lib/type';
import formCreate from "@form-create/ant-design-vue";

export default defineComponent({
  name: 'Fetch',
  components: {
    FormCreate: formCreate.$form(),
  },
  props: ['modelValue', 'to'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { to, modelValue } = toRefs(props),
      timeFn = ref(),
      fApi = ref({}),
      fValue = computed(() => {
        if (modelValue.value) {
          if (is.String(modelValue.value)) {
            return {
              action: modelValue.value
            };
          } else if (!modelValue.value._parse && modelValue.value.parse) {
            return { ...modelValue.value, _parse: `${modelValue.value.parse}` };
          } else if (is.Function(modelValue.value._parse)) {
            return { ...modelValue.value, _parse: `${modelValue.value._parse}` };
          }
        } else {
          return {};
        }
      }),
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
          title: '接口: ',
          // value: 'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json',
          validate: [{ required: true, message: '请数据接口' }]
        },
        {
          type: 'select',
          field: 'method',
          title: '请求方式: ',
          value: 'GET',
          options: [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
          ]
        },
        {
          type: 'Struct',
          field: 'data',
          title: '附带数据: ',
          value: {},
          props: {
            defaultValue: {},
          }
        },
        {
          type: 'Struct',
          field: 'headers',
          title: 'header信息: ',
          value: {},
          props: {
            defaultValue: {},
          }
        },
        {
          type: 'a-textarea',
          field: '_parse',
          title: '解析函数',
          info: '解析接口数据，返回组件所需的数据结构',
          value: 'function (res){\n   return res.rows.map(item => {return {label:item.name,value:item.adcode}});\n}',
          modelField: 'value',
          props: {
            rows: 8
          },
          validate: [{
            validator: (_, v) => {
              if (v) {
                try {
                  parseFn(v);
                } catch (e) {
                  return Promise.reject('请输入正确的解析函数');
                }
              }
              return Promise.resolve();
            }
          }]
        },
      ])

    const parseFn = (data) => {
      return eval(`(function(){return ${data} })()`);
    }, fApiSubmit = () => {
      if (fApi.value) {
        fApi.value.submit((formData) => {
          formData.to = to.value || 'options';
          if (formData._parse) {
            formData.parse = parseFn(formData._parse);
          }
          emit('update:modelValue', formData);
        })
      }
    }, onChange = () => {
      clearTimeout(timeFn.value)
      timeFn.value = setTimeout(() => {
        fApiSubmit()
      }, 1500);
    }

    onMounted(fApiSubmit)

    return {
      fApi,
      fValue,
      option,
      rule,
      onChange,
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