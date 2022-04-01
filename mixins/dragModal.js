/**
 * 针对Modal无法拖动处理
 * 
 * 使用vue混合方式引入使用，可只在当前vue的浏览界面使用 和可以直接注册到全局
 *  {
 *      mixins: [dragModal],
 *  }
 */

let dragModalTitleDom = null, dragModalDom = null, isDrag = false, x = 0, y = 0, left = 0, top = 0;

const dragModalMouseout = (e) => {
    // 鼠标移出后清理样式、事件、变量
    if (!isDrag) {
        e.target.style = null
        dragModalTitleDom.removeEventListener('mouseout', dragModalMouseout)
        dragModalDom = null;
        dragModalTitleDom = null;
    }
}, dragModalMousedown = (e) => {
    // 鼠标点下
    e.preventDefault();
    isDrag = true;
    x = e.clientX;
    y = e.clientY;
    left = Number(dragModalDom.style.left.replace('px', ''));
    top = dragModalDom.offsetTop;
}, dragModalMouseup = (e) => {
    // 鼠标松开
    isDrag = false;
}, bodyMousemove = (e) => {
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
            dragModalTitleDom.addEventListener('mouseout', dragModalMouseout)

            // 鼠标点下
            dragModalTitleDom.addEventListener('mousedown', dragModalMousedown)
            // 鼠标松开
            dragModalTitleDom.addEventListener('mouseup', dragModalMouseup)
        }
    }
}

export default {
    mounted() {
        document.body.addEventListener('mousemove', bodyMousemove, false)
    },
    beforeUnmount() {
        document.body.removeEventListener('mousemove', bodyMousemove)
    },
}