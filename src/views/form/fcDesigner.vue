<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <Breadcrumb />
        </div>
        <div class="qlContent-body">
            <DoFCDesigner ref="fcDesignerRef">
                <template #btns>
                    <a-space>
                        <a-button type="primary" @click="viewer($refs.fcDesignerRef)">预览</a-button>
                        <a-button @click="addRuleRule($refs.fcDesignerRef)">添加默认值</a-button>
                        <a-button @click="consoleLog($refs.fcDesignerRef)">控制台打印</a-button>
                        <a-button @click="clear($refs.fcDesignerRef)">清空</a-button>
                    </a-space>
                </template>
            </DoFCDesigner>

            <a-modal v-model:visible="modal.show" :width="800" title="预览">
                <FormCreate
                    v-model:api="form.api"
                    v-model="form.value"
                    :rule="form.rule"
                    :option="form.options"
                />
            </a-modal>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import DoFCDesigner from "../../../components/doFCDesigner";
import formCreate from '@form-create/ant-design-vue';


export default defineComponent({
    components: { Breadcrumb, DoFCDesigner, FormCreate: formCreate.$form(), },
    setup() {
        const modal = ref({
            show: false,
            data: null
        }), form = ref({
            api: {},
            value: null,
            rule: [],
            options: {
                form: {
                    layout: "vertical",
                },
                submitBtn: false,
            }
        })

        const cooyObj = [
            {
                "type": "row",
                "props": {
                    "gutter": 20
                },
                "children": [
                    {
                        "type": "col",
                        "props": {
                            "span": 6
                        },
                        "children": [
                            {
                                "type": "input",
                                "field": "customerNo",
                                "title": "客户号",
                                "props": {
                                    "placeholder": "可不填写,由系统生成客户号"
                                },
                                "_fc_drag_tag": "input",
                                "hidden": false,
                                "display": true,
                                "info": ""
                            }
                        ],
                        "_fc_drag_tag": "col",
                        "hidden": false,
                        "display": true
                    },
                    {
                        "type": "col",
                        "props": {
                            "span": 6
                        },
                        "children": [
                            {
                                "type": "input",
                                "field": "name",
                                "title": "客户全称",
                                "_fc_drag_tag": "input",
                                "hidden": false,
                                "display": true
                            }
                        ],
                        "_fc_drag_tag": "col",
                        "hidden": false,
                        "display": true
                    },
                    {
                        "type": "col",
                        "props": {
                            "span": 6
                        },
                        "children": [
                            {
                                "type": "input",
                                "field": "nameEn",
                                "title": "客户全称2",
                                "_fc_drag_tag": "input",
                                "hidden": false,
                                "display": true
                            }
                        ],
                        "_fc_drag_tag": "col",
                        "hidden": false,
                        "display": true
                    },
                    {
                        "type": "col",
                        "props": {
                            "span": 6
                        },
                        "children": [
                            {
                                "type": "select",
                                "field": "countryId",
                                "title": "国家/地区",
                                "options": [
                                    {
                                        "value": "1",
                                        "label": "选项1"
                                    },
                                    {
                                        "value": "2",
                                        "label": "选项2"
                                    }
                                ],
                                "_fc_drag_tag": "select",
                                "hidden": false,
                                "display": true
                            }
                        ],
                        "_fc_drag_tag": "col",
                        "hidden": false,
                        "display": true
                    }
                ],
                "_fc_drag_tag": "row",
                "hidden": false,
                "display": true
            }
        ]

        const consoleLog = (ref) => {
            console.log('rule', ref.getRule())
        }, viewer = (ref) => {
            const rule = ref.getRule()
            form.value.rule = rule
            modal.value.show = true;
        }, addRuleRule = (ref) => {
            ref.setRule(cooyObj)
        }, clear = (ref) => {
            ref.setRule([])
        };
        return {
            modal,
            form,
            viewer,
            addRuleRule,
            consoleLog,
            clear,
        };
    },
});
</script>
