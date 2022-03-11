<template>
  <div class="qlContent">
    <div class="qlContent-head">
      <Breadcrumb />
    </div>
    <div class="qlContent-body">
      <a-table
        :dataSource="dataSource"
        :loading="loading"
        :columns="columns"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 't1'">
            <a>t1</a>
          </template>
          <template v-if="column.dataIndex === 't2'">
            <a>t2</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import DoTable from "../../../components/doTable";
import Breadcrumb from "../../../components/breadcrumb";

export default defineComponent({
  components: { Breadcrumb, ATable: DoTable },
  setup() {
    const dataSource = ref([]),
      loading = ref(false),
      columns = ref([
        {
          title: "操作",
          dataIndex: "t1",
          fixed: 'left'
        },
        {
          title: "姓名",
          dataIndex: "name",
        },
        {
          title: "年龄",
          dataIndex: "age",
        },
        {
          title: "住址",
          dataIndex: "address",
        },
        {
          title: "住址1",
          dataIndex: "address1",
        },
        {
          title: "操作",
          dataIndex: "t2",
          fixed: 'right'
        },

      ]);


    const getData = () => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = [
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address1: "1号",
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address1: "2号",
            address: "西湖区湖底公园1号",
          },
        ]
        loading.value = false;
      }, 1000)
    }

    onMounted(getData)

    return {
      pagination: ref({
        current: 1,
        pageSize: 10,
        total: 2,
      }),
      columns,
      loading,
      dataSource,
    };
  },
});
</script>
