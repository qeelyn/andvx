import uniqueId from '@form-create/utils/lib/unique';
import { makeOptionsRule } from '../../utils/index';

const label = '选择器';
const name = 'select';

export default {
    icon: 'icon-select',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {
            },
            options: [
                { value: '1', label: '选项1' },
                { value: '2', label: '选项2' },
            ]
        };
    },
    props() {
        return [
            { type: 'input', field: 'placeholder', title: '占位符' },
            { type: 'switch', field: 'allowClear', title: '支持清除' },
            { type: 'switch', field: 'autoClearSearchValue', title: '是否在选中项后清空搜索框', info: '只在 mode 为 multiple 或 tags 时有效', value: true },
            { type: 'switch', field: 'autofocus', title: '获取焦点' },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'switch', field: 'defaultActiveFirstOption', title: '是否默认高亮第一个选项', value: true },
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'input', field: 'dropdownClassName', title: '下拉菜单的 className 属性' },
            { type: 'switch', field: 'filterOption', title: '是否根据输入项进行筛选', value: true },
            { type: 'inputNumber', field: 'maxTagCount', title: '最多显示多少个 tag' },
            { type: 'inputNumber', field: 'maxTagTextLength', title: '最大显示的 tag 文本长度' },
            {
                type: 'select',
                field: 'mode',
                title: '设置 Select 的模式为多选或标签',
                props: {
                    allowClear: true
                },
                options: [
                    { label: 'multiple', value: 'multiple' },
                    { label: 'tags', value: 'tags' },
                    { label: 'combobox', value: 'combobox' },
                ]
            },
            { type: 'input', field: 'notFoundContent', title: '当下拉列表为空时显示的内容', value: 'Not Found' },
            { type: 'input', field: 'optionFilterProp', title: '搜索时过滤对应的 option 属性', info: '不支持 children', value: 'value' },
            { type: 'input', field: 'optionLabelProp', title: '回填到选择框的 Option 的属性值', info: '默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value', value: 'label' },
            { type: 'switch', field: 'showSearch', title: '使单选模式可搜索' },
            { type: 'switch', field: 'showArrow', title: '是否显示下拉小箭头', value: true },
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