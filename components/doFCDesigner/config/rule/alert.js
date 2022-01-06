const label = '提示';
const name = 'a-alert';

export default {
    icon: 'icon-alert',
    label,
    name,
    rule() {
        return {
            type: name,
            props: {
                message: '内容',
                description: '辅助性文字',
            },
        };
    },
    props() {
        return [
            { type: 'input', field: 'message', title: '内容', value: '内容' },
            { type: 'input', field: 'description', title: '辅助性文字', value: '辅助性文字' },
            {
                type: 'select',
                field: 'type',
                title: '主题',
                value: 'info',
                options: [
                    { label: 'success', value: 'success' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' },
                    { label: 'error', value: 'error' }]
            },
            {
                type: 'switch',
                field: 'closable',
                title: '是否可关闭',
                value: false
            },
            {
                type: 'switch',
                field: 'banner',
                title: '是否用作顶部公告',
                value: false
            },
            { type: 'switch', field: 'showIcon', title: '是否显示图标' },
        ];
    }
};