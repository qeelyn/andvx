<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :theme="theme"
    @click="
      ({ key }) => {
        handleClick(key);
      }
    "
  >
    <MenuItem
      v-for="(item, index) in menuList"
      :keyValue="`${keyPrefix}-${index}`"
      :key="`${keyPrefix}-${index}`"
      :value="item"
      @onMoreIconClick="
        (key) => {
          handleClick(key, true);
        }
      "
    />
  </a-menu>
</template>

<script>
import { defineComponent, ref, toRefs, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import MenuItem from "./menuItem.vue";

export default defineComponent({
  components: { MenuItem },
  props: {
    theme: { type: String, default: "dark" },
    keyPrefix: { type: String, default: "menu" },
  },
  setup(props) {
    const router = useRouter(),
      store = useStore(),
      { keyPrefix } = toRefs(props),
      menuList = computed(() => store.state.andvx.menuList ? [...store.state.andvx.menuList] : []),
      resetInitMenu = computed(() => store.state.andvx.resetInitMenu),
      openKeys = ref([]),
      selectedKeys = ref([]);

    const init = () => {
      // 初始化处理
      let selectedKey = getRouterPath();
      selectedKeys.value = selectedKey ? [selectedKey] : [];
      openKeys.value = selectedKey ? getOpenKeys(selectedKey) : [];
    }, getRouterPath = (ary, key) => {
      //   得到当前路由下的 key
      let result = null;
      if (!ary) {
        ary = menuList.value;
        key = keyPrefix.value;
      }
      if (ary) {
        let length = ary.length;

        for (let i = 0; i < length; i++) {
          let item = ary[i];
          if (item.router === location.pathname) {
            result = `${key}-${i}`;
          } else if (item.children && item.children.length) {
            result = getRouterPath(item.children, `${key}-${i}`);
          }
          if (result) {
            break;
          }
        }
      }
      return result;
    }, getOpenKeys = (key) => {
      // 处理openKeys
      let keyAry = key.substring(0, key.lastIndexOf("-")).split("-"),
        result = [];
      keyAry.map((item) => {
        if (item != keyPrefix.value) {
          if (result.length) {
            result.push(`${result[result.length - 1]}-${item}`);
          } else {
            result.push(`${keyPrefix.value}-${item}`);
          }
        }
      });
      return result;
    }, handleClick = (key, isOpen) => {
      // 处理点击
      let clickData = null;
      selectedKeys.value = [key];

      key.split("-").forEach((item, index) => {
        if (index - 1 === 0) {
          clickData = menuList.value[item];
        } else if (index - 1 > 0) {
          if (clickData && clickData.children) {
            clickData = clickData.children[item];
          }
        }
      });

      if (clickData) {
        if (isOpen) {
          window.open(clickData.router);
        } else {
          router.push(clickData.router);
        }
      }
    };

    onMounted(init);

    watch(menuList, init, {
      deep: true
    })

    watch(resetInitMenu, init)

    return {
      menuList,
      openKeys,
      selectedKeys,
      handleClick,
    }
  },



});
</script>