import uniqueId from '@form-create/utils/lib/unique';
import { makeOptionsRule } from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    icon: 'icon-radio',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            info: '',
            options: [
                { value: '1', label: '选项1' },
                { value: '2', label: '选项2' },
            ]
        };
    },
    props() {
        return [
            makeOptionsRule('options'),
            { type: 'switch', field: 'disabled', title: '禁用' },
            { type: 'input', field: 'name', title: '所有 input[type="radio"] 的 name 属性' },
            {
                type: 'select',
                field: 'optionType',
                title: '用于设置 Radio options 类型',
                value: 'default',
                options: [
                    { label: 'button', value: 'button' },
                    { label: 'default', value: 'default' },
                ]
            },
            {
                type: 'select',
                field: 'size',
                title: '大小，只对按钮样式生效',
                value: 'default',
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            },
            {
                type: 'struct', field: 'getPopupContainer', title: '定义浮层的容器，默认为 body', props: {
                    title: `定义浮层的容器`,
                    defaultValue: (triggerNode) => document.body
                }
            },
            {
                type: 'struct', field: 'filterOption', title: '搜索时对筛选结果项的排序', props: {
                    title: `搜索时对筛选结果项的排序`,
                    defaultValue: (optionA, optionB) => 0
                }
            },
            {
                type: 'struct', field: 'filterSort', title: '根据输入项进行筛选', props: {
                    title: `根据输入项进行筛选`,
                    defaultValue: (inputValue, option) => true
                }
            },
        ];
    }
};