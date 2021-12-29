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
                    <a-button>xxx</a-button>
                </div>
            </div>
        </div>
        <div class="qlContent-body">首页</div>
    </div>
</template>
<script >
import { defineComponent, ref, watch } from 'vue'
import { useStore } from "vuex";
import Breadcrumb from "../../components/breadcrumb";

export default defineComponent({
    components: { Breadcrumb },
    setup() {
        const store = useStore();
      
    }
});
</script>