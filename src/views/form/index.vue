<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <p>一个认为是目前标准表单提交示例:</p>
            <p>1.在未修改数据的时候不允许提交</p>
            <p>2.有数据修改时候有小红点提醒</p>
            <p>3.表单有变更但未保存,在离开页面或者关闭浏览器的时候需拦截提醒</p>
            <p>4.前端验证提交后,后端再保存数据前,验证字段异常返回给前端的展示处理</p>
            <StandardFrom ref="standardFromRef" />
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import leavePageDetection from "../../../mixins/leavePageDetection";
import StandardFrom from "./standard.vue";

export default defineComponent({
    components: { Breadcrumb, StandardFrom },
    mixins: [leavePageDetection],
    setup() {

        return {
        };
    },
});
</script>
