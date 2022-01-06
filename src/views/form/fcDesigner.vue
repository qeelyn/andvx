<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <DoFCDesigner ref="fcDesignerRef">
                <template #btns>
                    <a-space>
                        <a-button @click="addRuleRule($refs.fcDesignerRef)">添加默认值</a-button>
                        <a-button @click="consoleLog($refs.fcDesignerRef)">控制台打印</a-button>
                        <a-button @click="clear($refs.fcDesignerRef)">清空</a-button>
                    </a-space>
                </template>
            </DoFCDesigner>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import DoFCDesigner from "../../../components/doFCDesigner";
import draggable from 'vuedraggable';

export default defineComponent({
    components: { Breadcrumb, DoFCDesigner, draggable },
    setup() {

        const consoleLog = (ref) => {
            console.log('rule', ref.getRule())
            console.log('json', ref.getJson())
        }, addRuleRule = (ref) => {
            ref.setRule([{ "type": "a-row", "children": [{ "type": "a-col", "props": { "span": 12 }, "children": [{ "type": "input", "field": "aei5tg", "title": "输入框", "_fc_drag_tag": "input", "hidden": false, "display": true }], "_fc_drag_tag": "a-col", "hidden": false, "display": true }], "_fc_drag_tag": "a-row", "hidden": false, "display": true }])
        }, clear = (ref) => {
            ref.setRule([])
        };
        return {
            addRuleRule,
            consoleLog,
            clear,
        };
    },
});
</script>
