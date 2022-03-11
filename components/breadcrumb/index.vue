<template>
  <a-breadcrumb :separator="separator" v-if="list && list.length">
    <a-breadcrumb-item v-for="(item, index) in list" :key="index">
      {{
        item
      }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
import { defineComponent, ref, toRefs, watch, computed, onMounted } from "vue";
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { useStore } from "vuex";

/**
 * 默认读取路由 如果配置了datas则使用datas中的数据
 * props.datas 数据格式 [{
 *    name:''
 * }]
 */
export default defineComponent({
  components: { ABreadcrumb: Breadcrumb, ABreadcrumbItem: BreadcrumbItem },
  props: {
    separator: { type: String, default: "/" },
    datas: { type: Array },
    // 菜单tree列表  一般需要把菜单放入vuex中 直接设置进来
  },
  setup(props) {
    const store = useStore(),
      { datas } = toRefs(props),
      list = ref([]),
      menuList = computed(() => store.state.andvx.menuList),
      menuIndexs = ref();

    const getMenuListData = (ary, idxStr) => {
      // 得到当前路由对应的菜单层级 格式为类似'1-1'
      if (!ary) {
        menuIndexs.value = null;
        ary = menuList.value;
      }
      ary.forEach((item, index) => {
        if (item.router && item.router === location.pathname) {
          menuIndexs.value = `${idxStr}-${index}`
        } else if (item.children && item.children.length) {
          getMenuListData(item.children, idxStr ? `${idxStr}-${index}` : `${index}`)
        }
      })
    };

    onMounted(() => {
      if (datas.value) {
        list.value = datas.value.map((item) => item.name);
      } else if (menuList.value && menuList.value.length) {
        getMenuListData();
      }
    })

    watch(menuIndexs, () => {
      if (menuIndexs.value) {
        let listValue = [], menuItem = null;
        menuIndexs.value.split('-').forEach((idx, index) => {
          if (index === 0) {
            menuItem = menuList.value[idx];
          } else {
            menuItem = menuItem.children[idx];
          }
          listValue.push(menuItem.name)
        })
        list.value = listValue;
      }
    })

    watch(menuList, () => {
      if (!datas.value && menuList.value && menuList.value.length) {
        getMenuListData();
      }
    }, {
      deep: true
    })

    watch(list, () => {
      if (list.value.length) {
        document.title = list.value.slice(-1);
      }
    }, {
      deep: true
    })

    return {
      list,
    };
  },
});
</script>