<script>
import { defineComponent, ref, toRefs, h, watch } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable';

export default defineComponent({
    name: 'DragBox',
    components: {
        draggable
    },
    props: ['rule', 'subRule', 'tag'],
    setup(props, { slots }) {
        const { rule, tag } = toRefs(props);

        const ruleProps = ref(rule.value.props);

        ruleProps.value.class = `${tag.value}-drag drag-box ${!slots.default ? `${tag.value}-holder` : ''}`;

        return () => h(draggable, ruleProps.value, {
            item: ({ element, index }) => {
                return h('div', {
                    class: 'div-tools'
                }, {
                    default: slots[element.slot]
                })
            }

        });
    },
});
</script>
<style>
.group-table .div-tools,
.group-table ._fc-l-item {
    max-width: 100px;
    display: inline-block;
}
.group-table .div-drag {
    outline: 1px dashed #2e73ff;
    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap;
}
</style>