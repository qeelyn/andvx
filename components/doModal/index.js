import { defineComponent, ref, toRefs, h } from "vue";
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue';
import './index.less'

// 不能同时设置title 和 #title 否则会有问题

export default defineComponent({
    name: 'DoModal',
    props: {
        // 标题
        title: { type: String },
        // 是否启用拖拽
        useDrag: { type: Boolean, default: true },
        // 是否启用全屏
        useFullScreen: { type: Boolean, default: true },
        // 全屏默认值
        defaultFullScreen: { type: Boolean, default: false },
        onCancel: { type: Function }
    },
    setup(props, { slots, attrs }) {
        const { useDrag, useFullScreen, defaultFullScreen, title, onCancel } = toRefs(props),
            isFullScreen = ref(defaultFullScreen.value ? defaultFullScreen.value : false),
            modalSlots = ref({}),
            modalAttrs = ref({}),
            defaultWidth = attrs.width ? `${Number(attrs.width)}` === 'NaN' ? attrs.width : `${Number(attrs.width)}px` : "520px";

        for (let key in slots) {
            modalSlots.value[key] = slots[key];
        }

        for (let key in attrs) {
            modalAttrs.value[key] = attrs[key]
        }

        modalAttrs.value.onCancel = (e) => {
            let isDestroyOnClose = Object.keys(modalAttrs.value).includes('destroyOnClose') && modalAttrs.value.destroyOnClose !== false
            if (onCancel.value) {
                onCancel.value(e);
            }
            if (dragModalDom) {
                // 避免动画效果出现的闪跳
                setTimeout(() => {
                    dragModalDom.style.left = null
                    dragModalDom.style.top = null
                    if (isDestroyOnClose) {
                        dragModalDom = null;
                    }
                }, 500)
            }
            if (isDestroyOnClose) {
                x = 0;
                y = 0;
                left = 0;
                top = 0;
            }
        }

        // 获取设置处理
        const getAntModalDom = (e) => {
            const ePath = e.path || (e.composedPath && e.composedPath()),
                antModalDom = ePath.find(item => item.className && typeof item.className === 'string' ? item.className.split(' ').includes('ant-modal') : false);
            return antModalDom;
        }

        let dragModalDom = null, x = 0, y = 0, left = 0, top = 0;
        // 拖动处理
        const titleMouseDown = (e) => {
            if (!dragModalDom) {
                dragModalDom = getAntModalDom(e);
            }
            e.preventDefault();
            if (useDrag.value && !isFullScreen.value) {
                x = e.clientX;
                y = e.clientY;
                left = Number(dragModalDom.style.left.replace('px', ''));
                top = dragModalDom.offsetTop;
                // 鼠标移动
                document.body.onmousemove = (e) => {
                    dragModalDom.style.left = `${e.clientX - x + left}px`
                    dragModalDom.style.top = `${e.clientY - y + top}px`
                }
                // 鼠标松开
                document.body.onmouseup = () => {
                    document.body.onmousemove = null
                    document.body.onmouseup = null
                }
            }
        }

        // 全屏处理
        const changeFullscreen = (isBoolean) => {
            const fullClassName = 'full-modal';
            if (typeof isBoolean === 'boolean') {
                isFullScreen.value = isBoolean;
            } else {
                isFullScreen.value = !isFullScreen.value;
            }
            if (isFullScreen.value) {
                // 全屏
                modalAttrs.value.wrapClassName = modalAttrs.value.wrapClassName ? modalAttrs.value.wrapClassName.split(' ').push(fullClassName).join(' ') : fullClassName
                modalAttrs.value.width = '100%';

            } else {
                // 复原
                modalAttrs.value.wrapClassName = modalAttrs.value.wrapClassName ? modalAttrs.value.wrapClassName.split(' ').filter(item => item != fullClassName).join(' ') : null
                modalAttrs.value.width = defaultWidth;
            }

            if (dragModalDom) {
                dragModalDom.style.left = null
                dragModalDom.style.top = null
            }
        }

        // 插槽组件
        const svgFullScreen = h(FullscreenOutlined, {
            class: 'ant-modal-svg-fullscreen',
            onClick: () => changeFullscreen()
        }), svgFullScreenExit = h(FullscreenExitOutlined, {
            class: 'ant-modal-svg-fullscreen',
            onClick: () => changeFullscreen()
        });

        modalSlots.value.title = () => h('div', {
            style: useDrag.value ? "cursor:move" : null,
            onMousedown: (e) => titleMouseDown(e),
        }, {
            default: () => [
                slots.title ? slots.title() : title.value,
                useFullScreen.value ? isFullScreen.value ? svgFullScreenExit : svgFullScreen : '',
            ]
        })

        return () => h(Modal, modalAttrs.value, modalSlots.value)
    }
})