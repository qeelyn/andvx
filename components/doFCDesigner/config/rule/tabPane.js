import uniqueId from '@form-create/utils/lib/unique';

const label = '标签页';
const name = 'tab-pane';

let uniqueIdValue = uniqueId();
export default {
    label,
    name,
    inside: true,
    drag: true,
    dragBtn: false,
    rule() {
        return {
            type: 'tab-pane',
            props: { tab: '新标签页', key: uniqueIdValue },
            children: []
        };
    },
    props() {
        return [
            { type: 'input', field: 'tab', title: '选项卡头显示文字', value: '新标签页' },
            { type: 'input', field: 'key', title: '对应 activeKey', value: uniqueIdValue },
            { type: 'switch', field: 'forceRender', title: '被隐藏时是否渲染 DOM 结构' },

        ];
    }
};