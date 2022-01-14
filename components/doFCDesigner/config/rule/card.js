const label = '卡片';
const name = 'card';

export default {
    icon: 'icon-span',
    label,
    name,
    drag: true,
    rule() {
        return {
            type: 'a-card',
            props: {},
            style: 'width:100%',
            children: []
        };
    },
    props() {
        return [
            { type: 'input', field: 'activeTabKey', title: '当前激活页签的 key' },
            { type: 'input', field: 'title', title: '卡片标题' },
            {
                type: 'input-custom-result',
                field: 'headStyle',
                title: '自定义标题区域样式',
                props: {
                    valueType: 'object'
                },
            },
            {
                type: 'input-custom-result',
                field: 'bodyStyle',
                title: '内容区域自定义样式',
                props: {
                    valueType: 'object'
                },
            },
            { type: 'switch', field: 'bordered', title: '是否有边框', value: true },
            { type: 'switch', field: 'hoverable', title: '鼠标移过时可浮起' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: 'default',
                options: [
                    { label: 'default ', value: 'default ' },
                    { label: 'small', value: 'small' },
                ]
            },
            {
                type: 'select',
                field: 'type',
                title: '卡片类型',
                props: {
                    allowClear: true,
                },
                options: [
                    { label: 'inner ', value: 'inner ' },
                ]
            },


        ];
    }
};