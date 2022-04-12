import { defineComponent, ref, toRefs, watch, h, resolveDirective, withDirectives } from "vue";
import { Modal } from 'ant-design-vue';

// 不能同时设置title 和 #title 否则会有问题

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
                let dragModalDom = el.parentElement.parentElement.parentElement.parentElement,
                    x = 0, y = 0, left = 0, top = 0;

                // 鼠标点下
                el.onmousedown = (e) => {
                    e.preventDefault();
                    x = e.clientX;
                    y = e.clientY;
                    left = Number(dragModalDom.style.left.replace('px', ''));
                    top = dragModalDom.offsetTop;

                    // 鼠标移动
                    document.body.onmousemove = (e) => {
                        console.log('move')
                        dragModalDom.style.left = `${e.clientX - x + left}px`
                        dragModalDom.style.top = `${e.clientY - y + top}px`
                    }
                    // 鼠标松开
                    document.body.onmouseup = () => {
                        document.body.onmousemove = null
                        document.body.onmouseup = null
                    }
                }

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
                modalAttrs.value.title = undefined;
                
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
            }
        }

        setDrag();

        watch(isDrag, () => {
            setDrag()
        })

        return () => h(Modal, modalAttrs.value, modalSlots.value)
    }
})