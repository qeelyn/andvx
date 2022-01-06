import uniqueId from '@form-create/utils/lib/unique';

const label = '滑块';
const name = 'slider';

export default {
    icon: 'icon-slider',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {},
        };
    },
    props() {
        return [
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'switch', field: 'dots', title: '是否只能拖拽到刻度上' },
            { type: 'switch', field: 'included', title: 'marks 不为空对象时有效', info: '值为 true 时表示值为包含关系，false 表示并列', value: true },
            { type: 'inputNumber', field: 'min', title: '最小值', value: 0 },
            { type: 'inputNumber', field: 'max', title: '最大值', value: 100 },
            { type: 'switch', field: 'range', title: '双滑块模式' },
            { type: 'switch', field: 'reverse', title: '反向坐标轴' },
            { type: 'inputNumber', field: 'step', title: '步长', value: 1 },
            { type: 'switch', field: 'vertical', title: '垂直方向' },
            { type: 'switch', field: 'tooltipVisible', title: 'Tooltip 将会始终显示', info: "值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。" },
            {
                type: 'select',
                field: 'tooltipPlacement',
                title: 'Tooltip 展示位置',
                value: "top",
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'left', value: 'left' },
                    { label: 'right', value: 'right' },
                    { label: 'bottom', value: 'bottom' },
                    { label: 'topLeft', value: 'topLeft' },
                    { label: 'topRight', value: 'topRight' },
                    { label: 'bottomLeft', value: 'bottomLeft' },
                    { label: 'bottomRight', value: 'bottomRight' },
                    { label: 'leftTop', value: 'leftTop' },
                    { label: 'leftBottom', value: 'leftBottom' },
                    { label: 'rightTop', value: 'rightTop' },
                    { label: 'rightBottom', value: 'rightBottom' },
                ]
            },
        ];
    }
};