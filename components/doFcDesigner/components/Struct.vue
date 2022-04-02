<template>
    <div class="_fc_struct">
        <a-button @click="onShowClick" block>{{ title }}</a-button>
        <a-modal
            :title="title"
            v-model:visible="visible"
            :maskClosable="false"
            destroyOnClose
            @ok="onOk"
            @cancel="onCancel"
        >
            <div ref="editorRef"></div>
            <div>
                <span
                    style="color: red;float:left;text-align: left;"
                    v-if="err"
                >输入内容格式有误{{ err !== true ? err : '' }}</span>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch, onMounted, nextTick } from 'vue'
import { Button, Modal } from "ant-design-vue";
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

export default defineComponent({
    components: { AButton: Button, AModal: Modal },
    name: 'Struct',
    props: {
        modelValue: [Object, Array, Function],
        title: {
            type: String,
            default: '编辑数据'
        },
        defaultValue: {
            require: false
        },
        validate: Function,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { modelValue, defaultValue, validate } = toRefs(props),
            editorRef = ref(),
            cMirror = ref(),
            visible = ref(false),
            err = ref(false),
            oldVal = ref();

        const onShowClick = () => {
            visible.value = true;
            nextTick(() => {
                load()
            })
        }, load = () => {
            const val = toJson(modelValue.value ? modelValue.value : defaultValue.value);
            oldVal.value = val;
            cMirror.value = CodeMirror(editorRef.value, {
                lineNumbers: true,
                mode: 'javascript',
                gutters: ['CodeMirror-lint-markers'],
                lint: true,
                line: true,
                tabSize: 2,
                lineWrapping: true,
                value: val || ''
            });
        }, toJson = (v) => {
            if (typeof v === 'function') {
                return `${v}`;
            } else if (typeof v === 'object') {
                return JSON.stringify(v, null, 2);
            } else {
                return v;
            }
        }, onCancel = () => {
            cMirror.value = null;
            oldVal.value = null;
            visible.value = false;
        }, onOk = () => {
            const str = cMirror.value.getValue();
            let val;
            try {
                val = eval('(function (){return ' + str + '}())');
            } catch (e) {
                err.value = ` (${e})`;
                return;
            }
            if (validate.value && false === validate.value(val)) {
                err.value = true;
                return;
            }
            onCancel();
            if (toJson(val) !== oldVal.value) {
                emit('update:modelValue', val);
            }
        };

        return {
            editorRef,
            visible,
            err,
            onShowClick,
            onOk,
            onCancel,
        };

    },
});
</script>

<style>
._fc_struct .CodeMirror {
    height: 450px;
}

._fc_struct .CodeMirror-line {
    line-height: 16px !important;
    font-size: 13px !important;
}

.CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fc_struct .el-dialog__body {
    padding: 0px 20px;
}
</style>