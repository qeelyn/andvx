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
            },
        };
    },
    props() {
        return [
            { type: 'switch', field: 'allowClear', title: '是否展示清除按钮', value: true },
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'input', field: 'clearText', title: '清除按钮的提示文案', value: 'clear' },
            { type: 'switch', field: 'disabled', title: '禁用' },
            { type: 'input', field: 'format', title: '展示的时间格式', value: 'HH:mm:ss' },
            { type: 'switch', field: 'hideDisabledOptions', title: '隐藏禁止选择的选项' },
            { type: 'switch', field: 'inputReadOnly', title: '设置输入框为只读' },
            { type: 'inputNumber', field: 'hourStep', title: '小时选项间隔', value: 1 },
            { type: 'inputNumber', field: 'minuteStep', title: '分钟选项间隔', value: 1 },
            { type: 'inputNumber', field: 'secondStep', title: '秒选项间隔', value: 1 },
            { type: 'input', field: 'placeholder', title: '占位文本' },
            { type: 'input', field: 'popupClassName', title: '弹出层类名' },
            { type: 'switch', field: 'showNow', title: '面板是否显示“此刻”按钮' },
            { type: 'switch', field: 'use12Hours', title: '使用 12 小时制，为 true 时 format 默认为 h:mm:ss a' },
            { type: 'input', field: 'valueFormat', title: '时分秒格式化', info: '默认dayjs对象，可填写HH:mm:ss' },
        ];
    }
};