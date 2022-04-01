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

            <a-modal v-model:visible="show" title="tc">
                <a-button @click="show1 = true">弹出1</a-button>
            </a-modal>
            <a-modal v-model:visible="show1" title="tc1">xxx</a-modal>
        </div>
    </div>
</template>
<script >
import { defineComponent, ref } from 'vue'
import { Button, Modal } from 'ant-design-vue';
import Breadcrumb from "../../../components/breadcrumb";
import dragModal from "../../../mixins/dragModal";

export default defineComponent({
    components: { Breadcrumb, AButton: Button, AModal: Modal },
    mixins: [dragModal],
    setup() {
        const show = ref(false),
            show1 = ref(false);

        const onShowModal = () => {
            Modal.confirm({
                title: '事件弹出Modal'
            })
        }

        return {
            show,
            show1,
            onShowModal,
        }
    }
});
</script>