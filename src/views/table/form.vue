<template>
  <div class="qlContent">
    <div class="qlContent-head">
      <Breadcrumb />
    </div>
    <div class="qlContent-body">
      <a-form ref="formRef" :model="model" :rules="rules" @validate="onFormValidate">
        <a-table :dataSource="dataSource" :columns="columns">
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'name'">
              <TableFormItem
                v-if="model && model['key'] === record['key']"
                :name="column.dataIndex"
                :error="errors.name"
              >
                <a-input v-model:value="model[column.dataIndex]" />
              </TableFormItem>
              <template v-else>{{ text }}</template>
            </template>
            <template v-else-if="column.dataIndex === 'age'">
              <TableFormItem
                v-if="model && model['key'] === record['key']"
                :name="column.dataIndex"
                :error="errors.age"
              >
                <a-input-number v-model:value="model[column.dataIndex]" />
              </TableFormItem>
              <template v-else>{{ text }}</template>
            </template>
            <template v-else-if="column.dataIndex === 'yes'">
              <TableFormItem
                v-if="model && model['key'] === record['key']"
                :name="column.dataIndex"
                :error="errors.yes"
              >
                <a-switch v-model:checked="model[column.dataIndex]" />
              </TableFormItem>
              <template v-else>
                <a-switch :checked="text" disabled />
              </template>
            </template>
            <template v-else-if="column.dataIndex === 'dx'">
              <TableFormItem
                v-if="model && model['key'] === record['key']"
                :name="column.dataIndex"
                :error="errors.dx"
              >
                <a-select ref="select" allowClear v-model:value="model[column.dataIndex]">
                  <a-select-option value="jack">Jack</a-select-option>
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
              </TableFormItem>
              <template v-else>{{ text }}</template>
            </template>
            <template v-else-if="column.dataIndex === 'actions'">
              <template v-if="model && model['key'] === record['key']">
                <a-badge :dot="!save.disabled">
                  <a
                    size="small"
                    type="link"
                    :disabled="save.disabled || null"
                    @click="onSave(index)"
                  >
                    <LoadingOutlined v-if="save.loading" />保存
                  </a>
                </a-badge>
                <a-divider type="vertical" />
                <a size="small" type="link" @click="onCancel(index)">取消</a>
              </template>
              <template v-else>
                <a size="small" type="link" @click="onEdit(index)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除吗?" @confirm="onDelete(index)">
                  <a size="small" type="link">删除</a>
                </a-popconfirm>
              </template>
            </template>
          </template>
        </a-table>
      </a-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, nextTick, watch } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import TableFormItem from "../../../components/doTable/tableFormItem.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { Breadcrumb, TableFormItem, LoadingOutlined },
  setup() {
    const formRef = ref(),
      columns = [
        {
          title: "ID",
          dataIndex: "key",
          width: 80,
        },
        {
          title: "姓名",
          dataIndex: "name",
          width: 160,
        },
        {
          title: "年龄",
          dataIndex: "age",
          width: 100,
        },
        {
          title: "是吗？",
          dataIndex: "yes",
          width: 90,
        },
        {
          title: "下拉",
          dataIndex: "dx",
          width: 100,
          isMove: false
        },
        {
          title: "住址",
          dataIndex: "address",
        },

        {
          title: "操作",
          dataIndex: "actions",
          width: 140,
          align: 'center',
          fixed: 'right'
        },
      ],
      dataSource = ref([
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          yes: true,
          dx: "jack",
          address: "西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          yes: false,
          address: "西湖区湖底公园1号",
        },
        {
          key: "3",
          name: "胡彦祖",
          age: 42,
          dx: "lucy",
          address: "西湖区湖底公园1号",
        },
        {
          key: "",
          name: "胡彦祖",
          age: 42,
          yes: false,
          dx: "Yiminghe",
          address: "西湖区湖底公园1号",
        },
      ]),
      model = ref(),
      rules = ref({
        name: [
          {
            required: true,
            message: "必须填写名称",
          },
        ],
        age: [
          {
            required: true,
            message: "必须填写年龄",
          },
        ],
        dx: [
          {
            required: true,
            message: "必须填写下拉",
          },
        ],
      }),
      save = ref({
        disabled: true,
        loading: false,
      }),
      errors = ref();

    // // 表格编辑-保存
    const onSave = (index) => {
      if (!save.value.disabled) {
        formRef.value
          .validate()
          .then(() => {
            save.value.loading = true;
            setTimeout(() => {
              dataSource.value[index].name = model.value.name;
              dataSource.value[index].age = model.value.age;
              dataSource.value[index].dx = model.value.dx;
              model.value = null;

              save.value.loading = false;
            }, 1000);
          })
          .catch((err) => { });
      }
    }, onCancel = (index) => {
      // 表格编辑-取消
      for (let key in errors.value) {
        errors.value[key] = null;
      }
      if (dataSource.value[index]["key"]) {
        model.value = null;
      } else {
        onDelete(index);
      }
      save.value.disabled = true;
    }, onEdit = (index) => {
      // 表格编辑-编辑
      let newError = { ...dataSource.value[index] };
      for (let key in newError) {
        newError[key] = null;
      }

      model.value = { ...dataSource.value[index] };
      errors.value = newError;
      nextTick(() => {
        save.value.disabled = true;
      })
    }, onDelete = (index) => {
      // 表格编辑-删除
      dataSource.value.splice(index, 1);
    }, onFormValidate = (name, status, errorMsgs) => {
      // 编辑时验证异常处理
      errors.value[name] = status ? null : errorMsgs.join(";");
    };

    watch(model, () => {
      save.value.disabled = false;
    }, {
      deep: true
    })

    return {
      save,
      formRef,
      model,
      rules,
      errors,
      columns,
      dataSource,
      onSave,
      onCancel,
      onEdit,
      onDelete,
      onFormValidate,
    };
  },
});
</script>
