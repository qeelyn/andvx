<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
           
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";

export default defineComponent({
    components: { Breadcrumb,  },
    setup() {


        return {

        };
    },
});
</script>
