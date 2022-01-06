import uniqueId from '@form-create/utils/lib/unique';
import { makeOptionsRule } from '../../utils/index';

const label = '多选框';
const name = 'checkbox';

export default {
    icon: 'icon-checkbox',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {},
            options: [
                { value: '1', label: '选项1' },
                { value: '2', label: '选项2' },
            ]
        };
    },
    props() {
        return [
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'input', field: 'name', title: '所有 input[type="checkbox"] 的 name 属性' },

        ];
    }
};