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
            <LayoutHeader v-model:collapsed="collapsed"></LayoutHeader>
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
import LayoutMenu from "../../components/layout/menu.vue";
import menuJson from "./menu.json";

export default defineComponent({
    components: { LayoutHeader, LayoutMenu },
    setup() {
        const store = useStore(),
            collapsed = ref(false),
            theme = ref('dark'),
            backTopTarget = ref(window);

        setTimeout(() => {
            store.dispatch('andvx/setMenuList', menuJson)
        }, 1000)


        onMounted(() => {
            backTopTarget.value = document.querySelector('#layoutBody')

        });

        return {
            collapsed,
            theme,
            backTopTarget,
        }
    }
});
</script>
<style>
</style>