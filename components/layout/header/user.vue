<template>
    <a-dropdown v-if="user && user.id">
        <span style="display: inline-block;margin-right:18px;">
            <a-avatar :src="user.avatar" style="vertical-align: middle;" />
            <span style="margin-left: 6px">{{ user.nickname }}</span>
        </span>
        <template #overlay>
            <a-menu @click="({ key }) => { $emit('menuClick', key) }">
                <a-menu-item key="info">
                    <i class="iconfont icon-icon_zhanghu" />
                    基础资料
                </a-menu-item>
                <a-menu-item key="safety">
                    <i class="iconfont icon-icon_mima" />
                    账号安全
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                    <i class="iconfont icon-icon_tuichu" />
                    退出登录
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script>
import { defineComponent } from "vue";
import { Dropdown, Avatar, Menu, MenuItem, MenuDivider } from "ant-design-vue";

export default defineComponent({
    components: { ADropdown: Dropdown, AAvatar: Avatar, AMenu: Menu, AMenuItem: MenuItem, AMenuDivider: MenuDivider },
    props: {
        user: { type: Object }
    },
})
</script>