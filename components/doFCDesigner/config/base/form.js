export default function form() {
    return [
        {
            type: 'radio',
            field: 'layout',
            value: 'vertical',
            title: '表单布局',
            options: [
                { value: 'horizontal', label: 'horizontal' },
                { value: 'vertical', label: 'vertical' },
                { value: 'inline', label: 'inline' },
            ]
        },
        {
            type: 'radio',
            field: 'labelAlign',
            value: 'right',
            title: '标签的文本对齐方式',
            options: [
                { value: 'right', label: 'right' },
                { value: 'left', label: 'left' },
            ]
        },
        {
            type: 'switch',
            field: 'hideRequiredMark',
            value: false,
            title: '隐藏所有表单项的必选标记',
        },
    ];
}