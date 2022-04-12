<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <div class="flexBox">
                <div class="flexAuto">
                    <Breadcrumb />
                </div>
                <div></div>
            </div>
        </div>
        <div class="qlContent-body">
            <a-space>
                <a-button @click="show = true">弹出</a-button>
                <a-button @click="onShowModal">事件弹出Modal</a-button>
            </a-space>

            <a-modal v-model:visible="show" @cancel="eventConsole('t1:cancel')" @ok="eventConsole('t1:ok')">
                <template #title>123</template>
                <a-button @click="show1 = true">弹出1</a-button>
            </a-modal>
            <a-modal v-model:visible="show1" title="show1">
                <template #title>title1</template>
                show1
            </a-modal>
        </div>
    </div>
</template>
<script >
import { defineComponent, ref } from 'vue'
import { Button, Modal } from 'ant-design-vue';
import Breadcrumb from "../../../components/breadcrumb";
import DoModal from "../../../components/doModal";
// import dragModal from "../../../mixins/dragModal";

export default defineComponent({
    components: { Breadcrumb, AButton: Button, AModal: Modal, DoModal, },
    // mixins: [dragModal],
    setup() {
        const show = ref(false),
            show1 = ref(false);

        const onShowModal = () => {
            Modal.confirm({
                title: '事件弹出Modal'
            })
        }, eventConsole = (str) => {
            console.log(str)
        }

        return {
            show,
            show1,
            onShowModal,
            eventConsole,
        }
    }
});
</script>