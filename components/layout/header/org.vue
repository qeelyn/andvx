<template>
    <template v-if="isOpOrg">
        <a-cascader
            :options="orgList"
            @change="(datas) => $emit('menuClick', datas[1])"
            :disabled="orgList.length === 0"
        >
            <span>
                {{ orgData ? `${orgData.opOrg.name}/${orgData.name}` : '暂无组织' }}
                <i
                    v-if="orgList.length"
                    class="iconfont icon-icon_xiajiantou"
                />
            </span>
        </a-cascader>
    </template>
    <template v-else>
        <a-dropdown :disabled="orgList.length === 0">
            <span style="display: inline-block;">
                <span>{{ orgData ? orgData.name : '暂无组织' }}</span>
                <i v-if="orgList.length" class="iconfont icon-icon_xiajiantou" />
            </span>
            <template #overlay>
                <a-menu @click="({ key }) => { $emit('menuClick', key) }">
                    <a-menu-item v-for="item in orgList" :key="item.id">{{ item.name }}</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </template>
</template>
<script>
import { defineComponent, ref, toRefs, computed, watch } from "vue";
export default defineComponent({
    props: {
        orgId: { type: String },
        loginOrgId: { type: String },
        isOpOrg: { type: Boolean },
        list: { type: Array }
    },
    setup(props) {
        const { orgId, loginOrgId, list, isOpOrg } = toRefs(props),
            orgData = computed(() => list.value ? list.value.find(item => item.id == loginOrgId.value) : null),
            orgList = ref([]);

        const setOrgList = () => {
            if (list.value) {
                if (isOpOrg.value) {
                    let ary = [];
                    list.value.forEach(item => {
                        if (loginOrgId.value != item.id) {
                            item.value = item.id;
                            item.label = item.name;
                            let aryFind = ary.find(aryItem => aryItem.id === item.opOrg.id);
                            if (aryFind) {
                                aryFind.children.push(item);
                            } else {
                                ary.push({
                                    value: item.opOrg.id,
                                    label: item.opOrg.name,
                                    ...item.opOrg,
                                    children: [item]
                                })
                            }
                        }
                    })
                    orgList.value = ary;
                } else {
                    orgList.value = list.value.filter(item => item.id != loginOrgId.value)
                }
            }
        }

        setOrgList();

        watch(list, () => {
            setOrgList()
        }, {
            deep: true
        })

        return {
            orgData,
            orgList,
        }
    },
})
</script>