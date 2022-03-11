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

export default defineComponent({
    components: { Breadcrumb, DoFcDesigner, FormCreate: formCreate.$form(), AModal: Modal, ATextarea: Textarea, ASpace: Space, AButton: Button },
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
            try {
                modal.value.data = cMirror.value.getValue()
                // TODO:json内有函数的目前还无法有效处理 如果是eval()可以转换但性能堪忧
                ref.setRule(formCreate.parseJson(modal.value.data, true))
                modal.value.addShow = false;
            } catch (e) {
                console.error(e);
            }
        }, loadCMirror = () => {
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
        }, onAddValue = (ref) => {
            modal.value.addShow = true;
            modal.value.data = formCreate.toJson(ref.getRule(), 2);
            nextTick(() => {
                loadCMirror()
            })
        }, clear = (ref) => {
            ref.setRule([])
        }, getResult = (formData) => {
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
