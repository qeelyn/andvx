<template>
    <a-form
        ref="formRef"
        :model="model"
        :rules="rules"
        @finish="onFormFinish"
        @validate="onFormValidate"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        style="width:400px"
    >
        <a-form-item
            label="名字"
            name="username"
            :help="error.username"
            :validateStatus="error.username ? 'error' : ''"
        >
            <a-input v-model:value="model.username" />
        </a-form-item>
        <a-form-item
            label="性别"
            name="gender"
            :help="error.gender"
            :validateStatus="error.gender ? 'error' : ''"
        >
            <a-select v-model:value="model.gender">
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="-1">女</a-select-option>
                <a-select-option value="0">保密</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item
            label="时间范围"
            name="date"
            :help="error.date"
            :validateStatus="error.date ? 'error' : ''"
        >
            <a-range-picker v-model:value="model.date" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
            <a-space>
                <a-badge :dot="!save.disabled">
                    <a-button
                        type="primary"
                        :loading="save.loading"
                        :disabled="save.disabled"
                        html-type="submit"
                    >保存</a-button>
                </a-badge>
                <a-button @click="onCancel">取消</a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>
<script>
import { defineComponent, ref, watch, nextTick } from "vue";

export default defineComponent({
    setup() {
        const formRef = ref(),
            model = ref({
                username: null,
                gender: null,
                date: [],
            }),
            rules = ref({
                username: [
                    { required: true, message: '必须填写名称' }
                ],
                gender: [
                    { required: true, message: '必须填写性别' }
                ]
            }),
            error = ref({
                username: null,
                gender: null,
                date: null,
            }),
            save = ref({
                // 处理有变更可提交
                disabled: true,
                // 保存时候的loading
                loading: false,
            });


        const getData = () => {
            for (let key in model.value) {
                if (Array.isArray(model.value[key])) {
                    model.value[key] = []
                } else {
                    model.value[key] = null;
                }
            }

            nextTick(() => {
                save.value.loading = false;
                save.value.disabled = true;
                for (let key in error.value) {
                    error.value[key] = null;
                }
                formRef.value.clearValidate()
            })
        }, onCancel = () => {
            getData();
        }, onFormFinish = () => {
            save.value.loading = true;
            setTimeout(() => {
                // 前端验证成功提交到后端,后端验证字段有问题返回针对某个字段异常提示
                const resutl = {
                    // error: {
                    //     username: '名称重复',
                    //     date: '时间错误'
                    // }
                }

                if (resutl.error) {
                    for (let key in resutl.error) {
                        error.value[key] = resutl.error[key]
                    }
                } else {
                    // 无异常
                    save.value.disabled = true;
                }

                save.value.loading = false;
            }, 1000)
        }, onFormValidate = (name, status, errorMsgs) => {
            error.value[name] = status ? null : errorMsgs[0];
        };

        watch(model, () => {
            save.value.disabled = false;
        }, {
            deep: true
        })

        return {
            formRef,
            model,
            rules,
            error,
            save,
            onCancel,
            onFormFinish,
            onFormValidate,
        };
    },
});
</script>
