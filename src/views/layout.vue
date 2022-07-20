<template>
  <a-layout id="qLayout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :theme="theme"
      :width="240"
      :collapsedWidth="60"
    >
      <div class="logo">
        <router-link to="/" style="color: #ffffff; font-size: 20px">LOGO</router-link>
      </div>
      <div class="deo-menu">
        <LayoutMenu :collapsed="collapsed" />
      </div>
    </a-layout-sider>
    <a-layout id="layoutBody" ref="layoutBody" :class="`ant-layout-${theme}`">
      <LayoutHeader v-model:collapsed="collapsed">
        <template #left>
          <HeaderSystem
            :list="[
              {
                id: 1,
                name: 'xxx',
                children: [
                  { id: 2, name: 'xxx-1' },
                  { id: 2, name: 'xxx-2' },
                ],
              },
            ]"
            @menuClick="systemMenuClick"
          />
        </template>
        <template #right>
          <a-space :size="20">
            <HeaderOrg
              orgId="1000"
              loginOrgId="1000"
              :list="orgList"
              @menuClick="orgMenuClick"
            />
            <HeaderUser :user="{ id: 1, nickname: 'xxxx' }" @menuClick="userMenuClick" />
            <span></span>
          </a-space>
        </template>
      </LayoutHeader>
      <a-layout-content class="layoutContent">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="route.meta.isKeepAlive ? Component : null" />
          </keep-alive>
          <component :is="!route.meta.isKeepAlive ? Component : null" />
        </router-view>
        <a-back-top :target="() => backTopTarget" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  Layout as ALayout,
  LayoutSider as ALayoutSider,
  LayoutContent as ALayoutContent,
  Space,
  BackTop,
} from "ant-design-vue";
import { useStore } from "vuex";
import LayoutHeader from "../../components/layout/header.vue";
import HeaderUser from "../../components/layout/header/user.vue";
import HeaderOrg from "../../components/layout/header/org.vue";
import HeaderSystem from "../../components/layout/header/system.vue";
import LayoutMenu from "../../components/layout/menu.vue";
import menuJson from "./menu.json";

export default defineComponent({
  components: {
    LayoutHeader,
    LayoutMenu,
    HeaderSystem,
    HeaderUser,
    HeaderOrg,
    ALayout,
    ALayoutSider,
    ALayoutContent,
    ASpace: Space,
    ABackTop: BackTop,
  },
  setup() {
    const store = useStore(),
      collapsed = ref(false),
      theme = ref("dark"),
      // theme = ref('gray'),
      backTopTarget = ref(window),
      orgList = ref();

    setTimeout(() => {
      orgList.value = [
        {
          timezone: "Asia/Hong_Kong",
          name: "Qeelyn 1000",
          id: 1000,
          baseCurrency: "HKD",
          opOrg: {
            timezone: "Asia/Hong_Kong",
            name: "Qeelyn Analytics",
            id: 1000,
            baseCurrency: "HKD",
          },
        },
        {
          timezone: "Asia/Hong_Kong",
          name: "Qeelyn 1001",
          id: 1001,
          baseCurrency: "HKD",
          opOrg: {
            timezone: "Asia/Hong_Kong",
            name: "Qeelyn Analytics",
            id: 1000,
            baseCurrency: "HKD",
          },
        },
        {
          timezone: "Asia/Hong_Kong",
          name: "xx 1003",
          id: 1003,
          baseCurrency: "HKD",
          opOrg: {
            timezone: "Asia/Hong_Kong",
            name: "Qeelyn 1002",
            id: 1002,
            baseCurrency: "HKD",
          },
        },
      ];
      store.dispatch("andvx/setMenuList", menuJson);
    }, 1000);

    const userMenuClick = (key) => {
        console.log(key);
      },
      orgMenuClick = (id) => {
        console.log(id);
      },
      systemMenuClick = (item, isOpen) => {
        console.log(item, isOpen);
      };

    onMounted(() => {
      backTopTarget.value = document.querySelector("#layoutBody");
    });

    return {
      collapsed,
      theme,
      orgList,
      backTopTarget,
      systemMenuClick,
      userMenuClick,
      orgMenuClick,
    };
  },
});
</script>
<style></style>
