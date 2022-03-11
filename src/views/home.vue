<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <div class="flexBox">
                <div class="flexAuto">
                    <Breadcrumb
                        :datas="[
                            { name: '首页' }
                        ]"
                    />
                </div>
                <div>
                    <a-button @click="onClick">alertPop</a-button>
                </div>
            </div>
        </div>
        <div class="qlContent-body">首页</div>
    </div>
</template>
<script >
import { defineComponent, ref, watch } from 'vue'
import { Button as AButton } from 'ant-design-vue';
import { useStore } from "vuex";
import Breadcrumb from "../../components/breadcrumb";
import AlertPop from "../../components/alertPop";

export default defineComponent({
    components: { Breadcrumb, AlertPop, AButton },
    setup() {
        const store = useStore();

        const onClick = () => {
            AlertPop.info('info')
            AlertPop.error('error')
            AlertPop.success('success')
            AlertPop.warning('warning')
        }

        return {
            onClick
        }
    }
});
</script>