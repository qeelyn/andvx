import uniqueId from '@form-create/utils/lib/unique';

const label = '隐藏域';
const name = 'hidden';

export default {
    icon: 'icon-input',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: label,
            props: {}
        };
    },
    props() {
        return [
            { type: 'input', field: 'formCreateRealType', title: '替换type' },
            {
                type: 'input-custom-result',
                field: 'formCreateProps',
                title: 'props',
                info: `标准的JSON格式{"key":value}用来设置展位组件的props参数内的默认初始化`,
                props: {
                    valueType: 'object'
                },
            },
        ];
    }
};