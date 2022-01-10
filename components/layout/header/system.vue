<template>
    <a-dropdown>
        <span style="display: inline-block;">
            系统切换
            <i class="iconfont icon-icon_xiajiantou" />
        </span>
        <template #overlay>
            <SystemMenu
                :menu="list"
                @menuClick="(item, isOpen) => { $emit('menuClick', item, isOpen) }"
            />
        </template>
    </a-dropdown>
</template>
<script>
import { defineComponent, toRefs } from "vue";
import SystemMenu from "./systemMenu.vue";

export default defineComponent({
    components: { SystemMenu },
    props: {
        list: { type: Array }
    },
})
</script>