<template>
    <a-dropdown v-if="orgData">
        <span style="display: inline-block;">
            <span>{{ orgData.name }}</span>
            <i class="iconfont icon-icon_xiajiantou" />
        </span>
        <template #overlay>
            <a-menu @click="({ key }) => { $emit('menuClick', key) }">
                <template v-for="item in list">
                    <a-menu-item :key="item.id" v-if="orgData.id != item.id">{{ item.name }}</a-menu-item>
                </template>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script>
import { defineComponent, toRefs, computed } from "vue";
export default defineComponent({
    props: {
        orgId: { type: String },
        list: { type: Array }
    },
    setup(props) {
        const { orgId, list } = toRefs(props),
            orgData = computed(() => list.value.find(item => item.id === orgId.value))

        return {
            orgData,
        }
    },
})
</script>