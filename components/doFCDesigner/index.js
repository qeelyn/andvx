import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
// import Fetch from './components/Fetch.vue';
import Validate from './components/Validate.vue';
import DragBox from './components/DragBox.vue';
import formCreate from '@form-create/ant-design-vue';
// import FcEditor from '@form-create/component-wangeditor';
import './style/index.css';
import draggable from 'vuedraggable';
import unique from '@form-create/utils/lib/unique';
import { makeOptionsRule } from './utils/index';

formCreate.component('draggable', draggable);
formCreate.component(DragTool.name, DragTool);
formCreate.component(DragBox.name, DragBox);
formCreate.component('Validate', Validate);
// formCreate.component('Fetch', Fetch);
// formCreate.component('FcEditor', FcEditor);

formCreate.register('_fc', {
    init(fc, rule) {
        rule.id = unique();
        if (!fc.value && rule.field)
            rule.field = unique();
        if (fc.value) {
            rule.effect._fc = false;
        }
    }
});

formCreate.register('_fc_tool', {
    init(_, rule) {
        rule.props.unique = unique();
    }
});

FcDesigner.install = function (Vue) {
    Vue.component('FcDesigner', FcDesigner);
};

// FcDesigner.makeOptionsRule = makeOptionsRule;

export default FcDesigner;