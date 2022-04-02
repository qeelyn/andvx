import uniqueId from '@form-create/utils/lib/unique';

const label = '时间选择器';
const name = 'timePicker';

export default {
    icon: 'icon-time',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {
                valueFormat: 'HH:mm:ss',
            },
            style: 'width:100%'
        };
    },
    props() {
        return [
            { type: 'switch', field: 'allowClear', title: '是否展示清除按钮', value: true },
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'input', field: 'clearText', title: '清除按钮的提示文案', value: 'clear' },
            { type: 'switch', field: 'disabled', title: '禁用' },
            { type: 'switch', field: 'hideDisabledOptions', title: '隐藏禁止选择的选项' },
            { type: 'switch', field: 'inputReadOnly', title: '设置输入框为只读' },
            { type: 'inputNumber', field: 'hourStep', title: '小时选项间隔', value: 1 },
            { type: 'inputNumber', field: 'minuteStep', title: '分钟选项间隔', value: 1 },
            { type: 'inputNumber', field: 'secondStep', title: '秒选项间隔', value: 1 },
            { type: 'input', field: 'placeholder', title: '占位文本' },
            { type: 'input', field: 'popupClassName', title: '弹出层类名' },
            { type: 'switch', field: 'showNow', title: '面板是否显示“此刻”按钮' },
            { type: 'switch', field: 'use12Hours', title: '使用 12 小时制，为 true 时 format 默认为 h:mm:ss a' },
            { type: 'input', field: 'valueFormat', title: '时分秒格式化', info: '默认dayjs对象，可填写HH:mm:ss', value: 'HH:mm:ss' },
            {
                type: 'struct', field: 'getPopupContainer', title: '定义浮层的容器，默认为 body', props: {
                    title: `定义浮层的容器`,
                    defaultValue: (trigger) => document.body
                }
            },
            {
                type: 'struct', field: 'disabledHours', title: '禁止选择部分小时选项', props: {
                    title: `禁止选择部分小时选项`,
                    defaultValue: () => { }
                }
            },
            {
                type: 'struct', field: 'disabledMinutes', title: '禁止选择部分分钟选项', props: {
                    title: `禁止选择部分小时选项`,
                    defaultValue: (selectedHour) => { }
                }
            },
            {
                type: 'struct', field: 'disabledSeconds', title: '禁止选择部分秒选项', props: {
                    title: `禁止选择部分秒选项`,
                    defaultValue: (selectedHour, selectedMinute) => { }
                }
            },
        ];
    }
};