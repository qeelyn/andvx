import { defineComponent, ref, toRefs, watch, h, resolveDirective, withDirectives } from "vue";
import { Modal } from 'ant-design-vue';

let dragModalDom = null, isDragMove = false, x = 0, y = 0, left = 0, top = 0;

const dragModalMousedown = (e) => {
    // 鼠标殿下
    e.preventDefault();
    isDragMove = true;
    x = e.clientX;
    y = e.clientY;
    left = Number(dragModalDom.style.left.replace('px', ''));
    top = dragModalDom.offsetTop;
}, bodyMousemove = (e) => {
    // 鼠标移动
    if (dragModalDom && isDragMove) {
        dragModalDom.style.left = `${e.clientX - x + left}px`
        dragModalDom.style.top = `${e.clientY - y + top}px`
    }
    return;
}, bodyMouseup = () => {
    // 鼠标松开
    isDragMove = false;
}

export default defineComponent({
    name: 'DoModal',
    props: {
        // 是否启用拖拽
        isDrag: { type: Boolean, default: true },
    },
    directives: {
        drag: {
            mounted(el) {
                // 指向 .ant-modal 位置
                dragModalDom = el.parentElement.parentElement.parentElement.parentElement
                // 鼠标点下
                el.addEventListener('mousedown', dragModalMousedown, false)
                // 鼠标移动
                document.body.addEventListener('mousemove', bodyMousemove, false)
                // 鼠标松开
                document.body.addEventListener('mouseup', bodyMouseup, false)
            },
            beforeUnmount() {
                document.body.removeEventListener('mousemove', bodyMousemove)
                document.body.removeEventListener('mouseup', bodyMouseup)
            },
        }
    },
    setup(props, { slots, attrs }) {
        const { isDrag } = toRefs(props),
            modalSlots = ref(),
            modalAttrs = ref(),
            drag = resolveDirective('drag')

        const setDrag = () => {
            modalSlots.value = { ...slots }
            modalAttrs.value = { ...attrs }

            if (isDrag.value) {
                modalSlots.value.title = () => withDirectives(
                    h('div', {
                        style: "cursor:move"
                    }, {
                        default: slots.title ? slots.title : () => attrs.title
                    }),
                    [
                        [drag]
                    ]
                )
                modalAttrs.value.title = undefined;
            }
        }

        setDrag();

        watch(isDrag, () => {
            setDrag()
        })

        return () => h(Modal, modalAttrs.value, modalSlots.value)
    }
})