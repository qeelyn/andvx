import uniqueId from '@form-create/utils/lib/unique';

const label = '颜色选择器';
const name = 'colorPicker';

export default {
    icon: 'icon-color',
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
            { type: 'switch', field: 'disabled', title: '是否禁用' },
            { type: 'switch', field: 'editable', title: '是否可以输入色值', value: true },
            { type: 'switch', field: 'alpha', title: '是否支持透明度选择' },
            { type: 'switch', field: 'hue', title: '是否支持色彩选择', value: true },
            { type: 'switch', field: 'recommend', title: '是否显示推荐的颜色预设' },
            {
                type: 'select',
                field: 'format',
                title: '颜色的格式',
                options: [
                    { label: 'hsl', value: 'hsl' },
                    { label: 'hsv', value: 'hsv' },
                    { label: 'hex', value: 'hex' },
                    { label: 'rgb', value: 'rgb' }
                ]
            },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                props: {
                    clearable: true
                },
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            }
        ];
    }
};