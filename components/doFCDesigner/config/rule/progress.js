const label = '进度条';
const name = 'a-progress';

export default {
    icon: 'icon-alert',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {
                percent: 0,
            },
            modelField: 'percent',
        };
    },
    props() {
        return [
            {
                type: 'select',
                field: 'type',
                title: '类型',
                value: 'line',
                options: [
                    { label: 'line', value: 'line' },
                    { label: 'circle', value: 'circle' },
                    { label: 'dashboard', value: 'dashboard' },
                ],
                control: [
                    {
                        value: 'line',
                        rule: [
                            { type: 'inputNumber', field: 'steps', title: '进度条总共步数' },
                            { type: 'input', field: 'strokeColor', title: '进度条的色彩' },
                            { type: 'inputNumber', field: 'strokeWidth', title: '进度条线的宽度(px)', value: 10 },
                        ]
                    },
                    {
                        value: 'circle',
                        rule: [
                            { type: 'input', field: 'strokeColor', title: '圆形进度条线的色彩' },
                            { type: 'inputNumber', field: 'strokeWidth', title: '圆形进度条线的宽度(%)', value: 6 },
                            { type: 'inputNumber', field: 'width', title: '圆形进度条画布宽度(px)', value: 132 },
                        ]
                    },
                    {
                        value: 'dashboard',
                        rule: [
                            { type: 'inputNumber', field: 'gapDegree', title: '仪表盘进度条缺口角度', info: '可取值 0 ~ 295', value: 75 },
                            {
                                type: 'select',
                                field: 'gapPosition',
                                title: '仪表盘进度条缺口位置',
                                value: 'bottom',
                                options: [
                                    { label: 'bottom', value: 'bottom' },
                                    { label: 'top', value: 'top' },
                                    { label: 'left', value: 'left' },
                                    { label: 'right', value: 'right' },
                                ],
                            },
                            { type: 'inputNumber', field: 'strokeWidth', title: '仪表盘进度条线的宽度(%)', value: 6 },
                            { type: 'inputNumber', field: 'width', title: '仪表盘进度条画布宽度(px)', value: 132 },
                        ]
                    }
                ]
            },
            { type: 'inputNumber', field: 'percent', title: '百分比', value: 0 },
            {
                type: 'switch',
                field: 'showInfo',
                title: '是否显示进度数值或状态图标',
                value: true
            },
            {
                type: 'select',
                field: 'status',
                title: '状态',
                props: {
                    closable: true
                },
                options: [
                    { label: 'success', value: 'success' },
                    { label: 'exception', value: 'exception' },
                    { label: 'normal', value: 'normal' },
                    { label: 'active(仅限 line)', value: 'active' }
                ]
            },
            { type: 'input', field: 'trailColor', title: '未完成的分段的颜色', value: null },
            {
                type: 'select',
                field: 'strokeLinecap',
                title: '进度条的样式',
                value: 'round',
                options: [
                    { label: 'round', value: 'round' },
                    { label: 'square', value: 'square' },
                ]
            },
            {
                type: 'object',
                field: 'success',
                title: '成功进度条相关配置',
                props: {
                    rule: [
                        { type: 'inputNumber', field: 'percent', title: '百分比' },
                        { type: 'input', field: 'strokeColor', title: '进度条的色彩', value: null },
                    ],
                    options: {
                        form: {
                            layout: "vertical",
                        },
                        submitBtn: false,
                    },
                },

            },


        ];
    }
};