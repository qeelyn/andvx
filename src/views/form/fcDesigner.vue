<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <div style="height: 80vh;">
                <DoFCDesigner ref="fcDesignerRef">
                    <template #btns>
                        <a-space>
                            <a-button type="primary" @click="viewer($refs.fcDesignerRef)">预览</a-button>
                            <a-button @click="modal.addShow = true">添加默认值</a-button>
                            <a-button @click="consoleLog($refs.fcDesignerRef)">控制台打印</a-button>
                            <a-button @click="clear($refs.fcDesignerRef)">清空</a-button>
                        </a-space>
                    </template>
                </DoFCDesigner>
            </div>

            <a-modal v-model:visible="modal.show" :width="800" title="预览">
                <FormCreate
                    v-model:api="form.api"
                    v-model="form.value"
                    :rule="form.rule"
                    :option="form.options"
                    @submit="getResult"
                />
            </a-modal>

            <a-modal
                v-model:visible="modal.addShow"
                :width="800"
                title="添加默认值"
                @ok="addRuleRule($refs.fcDesignerRef)"
            >
                <a-textarea
                    v-model:value="cooyObj"
                    placeholder="Autosize height with minimum and maximum number of lines"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
                />
            </a-modal>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import DoFCDesigner from "../../../components/doFCDesigner";
import { initRules } from "../../../components/doFCDesigner/utils/parse";
import formCreate from '@form-create/ant-design-vue';


export default defineComponent({
    components: { Breadcrumb, DoFCDesigner, FormCreate: formCreate.$form(), },
    setup() {
        const modal = ref({
            show: false,
            addShow: false,
            data: null
        }), form = ref({
            api: {},
            value: null,
            rule: [],
            options: {
                form: {
                    layout: "vertical",
                },
                // submitBtn: false,
            }
        }), dictionary = ref({
            'XYG': [
                { name: 'XYG1', code: '1' },
                { name: 'XYG2', code: '2' },
                { name: 'XYG3', code: '3' },
            ]
        }), cooyObj = ref();

        // 测试 a-tabs  a-tabs存在无法渲染问题
        // cooyObj.value = JSON.stringify([
        //     {
        //         "type": "a-tabs",
        //         "children": [
        //             {
        //                 "type": "a-tab-pane",
        //                 "props": {
        //                     "tab": "新标签页",
        //                     "key": "q2f5tjvv7qmb"
        //                 },
        //                 "_fc_drag_tag": "tab-pane",
        //                 "hidden": false,
        //                 "display": true
        //             }
        //         ],
        //         "_fc_drag_tag": "tabs",
        //         "hidden": false,
        //         "display": true
        //     }
        // ])

        // 测试 group-table
        cooyObj.value = JSON.stringify([
            {
                "class": "group-table",
                "realType": "group-table",
                "type": "div",
                "field": "4v45tjwjpse6",
                "title": "表格",
                "children": [
                    {
                        "type": "input",
                        "field": "bca5tjwjq9kb",
                        "title": "输入框",
                        "_fc_drag_tag": "input",
                        "hidden": false,
                        "display": true,
                        "validate": [
                            {
                                "type": "string",
                                "trigger": "change",
                                "mode": "required",
                                "message": "1111",
                                "required": true
                            }
                        ]
                    },
                    {
                        "type": "input",
                        "field": "cct",
                        "title": "输入框",
                        "_fc_drag_tag": "input",
                        "hidden": false,
                        "display": true,
                        "validate": [
                            {
                                "type": "string",
                                "trigger": "change",
                                "mode": "required",
                                "message": "ccct",
                                "required": true
                            }
                        ]
                    }
                ],
                "_fc_drag_tag": "group-table",
                "hidden": false,
                "display": true
            }
        ])

        const consoleLog = (ref) => {
            let rule = ref.getRule();
            console.log('rule', rule)
            // initRules(rule, dictionary.value)
        }, viewer = (ref) => {
            const rule = ref.getRule();
            initRules(rule, dictionary.value);
            console.log('initRules', rule)
            modal.value.show = true;
            form.value.rule = rule
        }, addRuleRule = (ref) => {
            ref.setRule(JSON.parse(cooyObj.value))
            modal.value.addShow = false;
        }, clear = (ref) => {
            ref.setRule([])
        }, getResult = (formData) => {
            console.log('result:', formData)
        };

        return {
            cooyObj,
            modal,
            form,
            viewer,
            addRuleRule,
            consoleLog,
            clear,
            getResult,
        };
    },
});
</script>
