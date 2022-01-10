const label = '标签页';
const name = 'tab';

export default {
    icon: 'icon-tab',
    label,
    name,
    children: 'tab-pane',
    rule() {
        return {
            type: 'a-tabs',
            children: []
        };
    },
    props() {
        return [
            { type: 'switch', field: 'animated', title: '是否使用动画切换', info: '当 type="card" 时为 false', value: true },
            { type: 'switch', field: 'centered', title: '标签居中展示' },
            { type: 'switch', field: 'hideAdd', title: '是否隐藏加号图标', info: '在 type="editable-card" 时有效' },
            {
                type: 'select',
                field: 'size',
                title: '尺寸',
                value: "default",
                options: [
                    { label: 'large', value: 'large' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                ]
            },
            {
                type: 'select',
                field: 'tabPosition',
                title: '页签位置',
                value: "top",
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'right', value: 'right' },
                    { label: 'bottom', value: 'bottom' },
                    { label: 'left', value: 'left' },
                ]
            },
            {
                type: 'select',
                field: 'type',
                title: '风格类型',
                value: "line",
                options: [
                    { label: 'line', value: 'line' },
                    { label: 'card', value: 'card' },
                    { label: 'editable-card', value: 'editable-card' },

                ]
            },
            { type: 'inputNumber', field: 'tabBarGutter', title: 'tabs 之间的间隙' },


        ];
    }
};