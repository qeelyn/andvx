import uniqueId from '@form-create/utils/lib/unique';
import { makeOptionsRule } from '../../utils/index';

const label = '级联选择器';
const name = 'cascader';

export default {
    icon: 'icon-cascader',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }]
                }]
            }
        };
    },
    props() {
        return [
            { type: 'input', field: 'placeholder', title: '输入框占位文本' },
            { type: 'switch', field: 'allowClear', title: '是否支持清除', value: true },
            { type: 'switch', field: 'autofocus', title: '自动获取焦点' },
            { type: 'switch', field: 'changeOnSelect', title: '点选每级菜单选项值都会发生变化' },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            {
                type: 'select',
                field: 'expandTrigger',
                title: '次级菜单的展开方式',
                value: 'click',
                options: [
                    { label: 'click', value: 'click' },
                    { label: 'hover', value: 'hover' }
                ]
            },
            {
                type: 'object',
                field: 'fieldNames',
                title: '自定义 options 中 label name children 的字段',
                value: { label: 'label', value: 'value', children: 'children' },
                props: {
                    rule: [
                        {
                            type: 'input',
                            field: 'label',
                            title: 'label',
                            value: 'label'
                        },
                        {
                            type: 'input',
                            field: 'value',
                            title: 'value',
                            value: 'value'
                        },
                        {
                            type: 'input',
                            field: 'children',
                            title: 'children',
                            value: 'children'
                        },
                    ]
                }
            },
            { type: 'input', field: 'notFoundContent', title: '当下拉列表为空时显示的内容', value: 'Not Found' },
            // { type: 'input', field: 'popupClassName', title: '自定义浮层类名' },
            {
                type: 'select',
                field: 'popupPlacement',
                title: '浮层预设位置',
                value: 'bottomLeft',
                options: [
                    { label: 'bottomLeft', value: 'bottomLeft' },
                    { label: 'bottomRight', value: 'bottomRight' },
                    { label: 'topLeft', value: 'topLeft' },
                    { label: 'topRight', value: 'topRight' },
                ]
            },
            { type: 'switch', field: 'showSearch', info: '无法与 loadData 一起使用', title: '是否支持搜索' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: 'default',
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            },
        ];
    }
};