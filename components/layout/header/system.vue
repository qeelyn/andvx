<template>
    <a-dropdown>
        <span style="display: inline-block;">
            系统切换
            <i class="iconfont icon-icon_xiajiantou" />
        </span>
        <template #overlay>
            <system-menu
                :menu="list"
                @menuClick="(item, isOpen) => { $emit('menuClick', item, isOpen) }"
            />
        </template>
    </a-dropdown>
</template>
<script>
import { defineComponent } from "vue";
import { Dropdown } from "ant-design-vue";
import SystemMenu from "./systemMenu.vue";

export default defineComponent({
    components: { SystemMenu, ADropdown: Dropdown },
    props: {
        list: { type: Array }
    },
})
</script>