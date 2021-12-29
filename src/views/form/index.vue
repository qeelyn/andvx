<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <a-cascader
                v-model:value="data"
                :options="options"
                :load-data="loadData"
                placeholder="Please select"
            />
            {{ data }}
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";

export default defineComponent({
    components: {Breadcrumb},
    setup() {
        const data = ref(["1", "1-1", "1-1-1"]),
            options = ref([
                {
                    zIndex: 0,
                    value: '1',
                    label: 'Zhejiang1',
                    isLeaf: false,
                    loading: false,
                }
            ]);
        const loadData = (selectedOptions, callback) => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;
            console.log(selectedOptions.length > 1)
            setTimeout(() => {
                targetOption.loading = false;
                let zIndex = targetOption.zIndex + 1;
                console.log(zIndex)
                targetOption.children = [{
                    zIndex: zIndex,
                    value: `${targetOption.value}-1`,
                    label: `${targetOption.label}-下级1`,
                    isLeaf: zIndex > 1,
                }, {
                    zIndex: zIndex,
                    value: `${targetOption.value}-2`,
                    label: `${targetOption.label}-下级2`,
                    isLeaf: zIndex > 1,
                }];
                callback && callback()
            }, 1000);

        }, getInit = (index = 0, ary) => {
            if (data.value && data.value.length) {
                let idx = null,
                    callback = () => {
                        let nextIndex = index + 1;
                        if (nextIndex < data.value.length - 1 && idx > -1) {
                            if (options.value[idx] && options.value[idx].children) {
                                getInit(nextIndex, options.value[idx].children)
                            }
                        }
                    };
                if (ary) {
                    idx = ary.findIndex(item => item.value === data.value[index])
                    loadData([ary[idx]], callback)
                } else {
                    idx = options.value.findIndex(item => item.value === data.value[index]);
                    loadData([options.value[idx]], callback)
                }
            }
        }

        getInit();

        return {
            options,
            data,
            loadData,
        };
    },
});
</script>
