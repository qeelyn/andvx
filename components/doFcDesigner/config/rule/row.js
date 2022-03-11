const label = '栅格布局';
const name = 'row';

export default {
    icon: 'icon-row',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            children: []
        };
    },
    children: 'col',
    props() {
        return [
            {
                type: 'select',
                field: 'align',
                title: 'flex 布局下的垂直排列方式',
                value: 'top',
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'middle', value: 'middle' },
                    { label: 'bottom', value: 'bottom' }
                ]
            },
            { type: 'inputNumber', field: 'gutter', title: '栅格间隔' },
            {
                type: 'select',
                field: 'justify',
                title: 'flex 布局下的水平排列方式',
                value: 'start',
                options: [
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' },
                    { label: 'center', value: 'center' },
                    { label: 'space-around', value: 'space-around' },
                    { label: 'space-between', value: 'space-between' }
                ]
            },
            {
                type: 'switch',
                field: 'wrap',
                title: '是否自动换行',
            },
        ];
    }
};