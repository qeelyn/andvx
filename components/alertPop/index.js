import { Alert } from 'ant-design-vue'
import { h, render as vueRender } from 'vue'
import "./index.less"

const containerIdName = 'alertPop'

/**
 * 弹框位置布局和具体实现
 * @param {*} options    
 * 参考https://next.antdv.com/components/alert-cn#API
 * 增加了 定时关闭功能  duration:秒 有值才能启用
 */
const pop = (options) => {
    const containerDiv = api.getContainerDom(),
        renderDev = document.createElement('div'),
        clost = () => {
            if (renderDev) {
                renderDev.remove();
            }
            // 判断容器的节点
            if (containerDiv && containerDiv.children.length === 0) {
                containerDiv.remove();
            }
        },
        vm = h(Alert, {
            ...options, afterClose: clost
        });

    document.body.appendChild(containerDiv);

    vueRender(vm, renderDev)
    containerDiv.appendChild(renderDev);

    if (options.duration) {
        setTimeout(() => {
            clost();
        }, options.duration * 1000)
    }

}


const api = {
    open: pop, getContainerDom: () => {
        let containerDiv = document.querySelector(`#${containerIdName}`);
        if (!containerDiv) {
            containerDiv = document.createElement('div')
            containerDiv.id = containerIdName
        }
        return containerDiv;
    },
},
    typeAry = ['success', 'info', 'warning', 'error'];

typeAry.forEach((type) => {
    api[type] = (message, duration, onClose) => {
        let options = {};
        if (typeof message === 'object') {
            options = message;
        } else {
            options = {
                duration,
                showIcon: true,
                closable: true,
                type,
                message,
                onClose
            }
        }

        api.open(options)
    }
});


export default api