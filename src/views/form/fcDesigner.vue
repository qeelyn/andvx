<template>
    <div class="qlContent">
        <div class="qlContent-head">
            <breadcrumb />
        </div>
        <div class="qlContent-body">
            <div style="height: 80vh;">
                <do-fc-designer ref="fcDesignerRef">
                    <template #btns>
                        <a-space>
                            <a-button type="primary" @click="viewer($refs.fcDesignerRef)">预览</a-button>
                            <a-button @click="onAddValue($refs.fcDesignerRef)">添加默认值</a-button>
                            <a-button @click="consoleLog($refs.fcDesignerRef)">控制台打印</a-button>
                            <a-button @click="clear($refs.fcDesignerRef)">清空</a-button>
                        </a-space>
                    </template>
                </do-fc-designer>
            </div>

            <a-modal v-model:visible="modal.show" :width="800" title="预览">
                <form-create
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
                title="添加rule"
                @ok="addRuleRule($refs.fcDesignerRef)"
            >
                <div v-if="modal.addShow" ref="editorRef"></div>
            </a-modal>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { Modal, Textarea, Space, Button } from 'ant-design-vue';
import Breadcrumb from "../../../components/breadcrumb";
import DoFcDesigner from "../../../components/doFcDesigner";
import { initRules } from "../../../components/doFcDesigner/utils/parse";
import formCreate from '@form-create/ant-design-vue';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import dragModal from "../../../mixins/dragModal";

export default defineComponent({
    components: { Breadcrumb, DoFcDesigner, FormCreate: formCreate.$form(), AModal: Modal, ATextarea: Textarea, ASpace: Space, AButton: Button },
    mixins: [dragModal],
    setup() {
        const editorRef = ref(),
            cMirror = ref(),
            modal = ref({
                show: false,
                addShow: false,
                data: null
            }),
            form = ref({
                api: {},
                value: null,
                rule: [],
                options: {
                    form: {
                        layout: "vertical",
                    },
                    // submitBtn: false,
                }
            }),
            dictionary = ref({
                'XYG': [
                    { name: 'XYG1', code: '1' },
                    { name: 'XYG2', code: '2' },
                    { name: 'XYG3', code: '3' },
                ]
            });

        // 方法的引入测试规则  用inputNumber的输入格式化展示作为测试用例
        // [
        //     {
        //         "type": "inputNumber",
        //         "field": "10h5uei80uy3",
        //         "title": "计数器",
        //         "style": "width:100%",
        //         "_fc_drag_tag": "inputNumber",
        //         "props": {
        //              "formatter": (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        //              "parser": (value) => value.replace(/\$\s?|(,*)/g, '')
        //         },
        //         value:null,
        //         "hidden": false,
        //         "display": true
        //     }
        // ]

        const consoleLog = (ref) => {
            // 控制台打印
            let rule = ref.getRule();
            console.log('rule', rule)
            // initRules(rule, dictionary.value)
        }, viewer = (ref) => {
            // 预览
            const rule = ref.getRule();
            initRules(rule, dictionary.value);
            console.log('initRules', rule)
            modal.value.show = true;
            form.value.rule = rule
        }, addRuleRule = (ref) => {
            // 添加规则
            try {
                modal.value.data = getMirrorValue();
                ref.setRule(modal.value.data, true)
                modal.value.addShow = false;
            } catch (e) {
                console.error(e);
            }
        }, loadCMirror = () => {
            // 加载编辑器
            cMirror.value = CodeMirror(editorRef.value, {
                lineNumbers: true,
                mode: 'javascript',
                gutters: ['CodeMirror-lint-markers'],
                lint: true,
                line: true,
                tabSize: 2,
                lineWrapping: true,
                value: modal.value.data || ''
            });
        }, getMirrorValue = () => {
            // 编辑器结果 结合formCreate处理规则json
            let data = null;
            try {
                data = eval(`(function (){return ${cMirror.value.getValue()} }())`);
                data = formCreate.parseJson(formCreate.toJson(data))
            } catch (e) {
                alert(e);
                return;
            }
            return data;
        }, onAddValue = (ref) => {
            // 添加默认值 弹出框
            modal.value.addShow = true;
            modal.value.data = formCreate.toJson(ref.getRule(), 2);
            nextTick(() => {
                loadCMirror()
            })
        }, clear = (ref) => {
            // 清空
            ref.setRule([])
        }, getResult = (formData) => {
            // 预览提交
            console.log('result:', formData)
        };

        return {
            editorRef,
            modal,
            form,
            viewer,
            addRuleRule,
            consoleLog,
            clear,
            onAddValue,
            getResult,
        };
    },
});
</script>
