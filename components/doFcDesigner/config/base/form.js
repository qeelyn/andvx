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
        {
            type: 'input-custom-result',
            field: 'labelCol',
            info: '同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}',
            title: 'label 标签布局',
            props: {
                valueType: 'object'
            }
        },
        {
            type: 'input-custom-result',
            field: 'wrapperCol',
            info: '用法同 labelCol',
            title: '入控件设置布局',
            props: {
                valueType: 'object'
            }
        },
    ];
}