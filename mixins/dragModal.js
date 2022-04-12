/**
 * 针对Modal无法拖动处理
 * 
 * 使用vue混合方式引入使用，可只在当前vue的浏览界面使用 和可以直接注册到全局
 *  {
 *      mixins: [dragModal],
 *  }
 */
export default {
    mounted() {
        let dragModalTitleDom = null, dragModalDom = null, isDrag = false, x = 0, y = 0, left = 0, top = 0;

        document.body.onmousemove = (e) => {
            if (dragModalDom && isDrag) {
                dragModalDom.style.left = `${e.clientX - x + left}px`
                dragModalDom.style.top = `${e.clientY - y + top}px`
            }
            if (['ant-modal-title', 'ant-modal-confirm-title'].includes(e.target.className)) {
                // 监听进入移动状态
                if (dragModalDom) {
                    return;
                } else {
                    let ePath = e.path || (e.composedPath && e.composedPath());
                    dragModalTitleDom = e.target;
                    dragModalDom = ePath.find(item => item.className.split(' ').includes('ant-modal'));

                    dragModalTitleDom.style.cursor = 'all-scroll'

                    //鼠标移出
                    dragModalTitleDom.onmouseout = (e) => {
                        // 鼠标移出后清理样式、事件、变量
                        if (!isDrag) {
                            e.target.style = null
                            dragModalTitleDom.onmouseout = null;
                            dragModalDom = null;
                            dragModalTitleDom = null;
                        }
                    }

                    // 鼠标点下
                    dragModalTitleDom.onmousedown = (e) => {
                        // 鼠标点下
                        e.preventDefault();
                        isDrag = true;
                        x = e.clientX;
                        y = e.clientY;
                        left = Number(dragModalDom.style.left.replace('px', ''));
                        top = dragModalDom.offsetTop;
                    }
                    // 鼠标松开
                    dragModalTitleDom.onmouseup = (e) => {
                        // 鼠标松开
                        isDrag = false;
                    }
                }
            }
        }
    },
    beforeUnmount() {
        document.body.onmousemove = null;
    },
}