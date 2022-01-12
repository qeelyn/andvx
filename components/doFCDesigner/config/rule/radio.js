import uniqueId from '@form-create/utils/lib/unique';
import { dataSourceConfig } from '../../utils/index';

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
            ...dataSourceConfig(),
        ];
    }
};