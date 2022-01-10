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
                <router-link to="/" style="color:#ffffff;font-size:20px">LOGO</router-link>
            </div>
            <div class="deo-menu">
                <LayoutMenu />
            </div>
        </a-layout-sider>
        <a-layout id="layoutBody" ref="layoutBody" :class="`ant-layout-${theme}`">
            <LayoutHeader v-model:collapsed="collapsed">
                <template #left>
                    <HeaderSystem
                        :list="[
                            {
                                id: 1, name: 'xxx', children: [
                                    { id: 2, name: 'xxx-1' },
                                    { id: 2, name: 'xxx-2' },
                                ]
                            }
                        ]"
                        @menuClick="systemMenuClick"
                    />
                </template>
                <template #right>
                    <a-space :size="20">
                        <HeaderOrg
                            orgId="1000"
                            :list="[{ id: '1000', name: 'org1000' }, { id: '1001', name: 'org1001' }]"
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
import { useStore } from "vuex";
import LayoutHeader from "../../components/layout/header.vue";
import HeaderUser from "../../components/layout/header/user.vue";
import HeaderOrg from "../../components/layout/header/org.vue";
import HeaderSystem from "../../components/layout/header/system.vue";
import LayoutMenu from "../../components/layout/menu.vue";
import menuJson from "./menu.json";

export default defineComponent({
    components: { LayoutHeader, LayoutMenu, HeaderSystem, HeaderUser, HeaderOrg },
    setup() {
        const store = useStore(),
            collapsed = ref(false),
            theme = ref('dark'),
            backTopTarget = ref(window);

        setTimeout(() => {
            store.dispatch('andvx/setMenuList', menuJson)
        }, 1000)

        const userMenuClick = (key) => {
            console.log(key)
        }, orgMenuClick = (id) => {
            console.log(id)
        }, systemMenuClick = (item, isOpen) => {
            console.log(item, isOpen)
        }


        onMounted(() => {
            backTopTarget.value = document.querySelector('#layoutBody')

        });

        return {
            collapsed,
            theme,
            backTopTarget,
            systemMenuClick,
            userMenuClick,
            orgMenuClick,
        }
    }
});
</script>
<style>
</style>
