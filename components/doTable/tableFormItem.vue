<template>
  <a-tooltip :visible="!!error" destroyTooltipOnHide color="red">
    <template #title>{{ error }}</template>
    <a-form-item class="tableFormItem" :name="name">
      <slot></slot>
    </a-form-item>
  </a-tooltip>
</template>
<script>
import { defineComponent } from "vue";
import { Tooltip, FormItem } from 'ant-design-vue';

export default defineComponent({
  components: { ATooltip: Tooltip, AFormItem: FormItem },
  props: {
    name: { type: String },
    error: { type: String },
  },
});
</script>