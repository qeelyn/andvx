const state = {
    // 用来处理有些菜单重新加载的问题
    resetInitMenu: false,
    /**
     * 菜单数据
     * [
     *  { name, icon, children, router }
     * ]
     */
    menuList: null,
    /**
     * 用于处理表格头部修改记录
     * tableHeader ：{
     *     "xxx":[
     *          { checked, title, key }
     *      ]
     * }
     */
    tableHeader: {},
}

const actions = {
    /**
     * 调用 layout/menu.vue组件init方法
     */
    resetInitMenu: function (event) {
        event.commit('resetInitMenu')
    },
    /**
     * 设置菜单到vuex中
     */
    setMenuList: function (event, data) {
        event.commit('setMenuList', data)
    },
    /**
    * 设置tableHeader
    */
    setTableHeader: function (event, data) {
        event.commit('setTableHeader', data)
    },
    /**
     * 更新tableHeader
     */
    updateTableHeader: function (event, data) {
        event.commit('updateTableHeader', data);
    }
}

const mutations = {
    /**
     * 设置菜单到vuex中
     * @param {*} state
     * @param string value 
     */
    resetInitMenu: function (state) {
        state.resetInitMenu = !state.resetInitMenu;
    },
    /**
     * 设置菜单到vuex中
     * @param {*} state
     * @param string value 
     */
    setMenuList: function (state, data) {
        state.menuList = [...data]
    },
    /**
     * 设置tableHeader
     * @param {*} state
     * @param string value 
     */
    setTableHeader: function (state, data) {
        state.tableHeader = data ? data : {}
    },
    /**
     * 更新tableHeader
     * @param {*} state
     * @param string value {code:'',value:[]}
     */
    updateTableHeader: function (state, data) {
        if (data && data.code) {
            if (data.value && data.value.length) {
                state.tableHeader[data.code] = data.value;
            } else {
                delete state.tableHeader[data.code];
            }
        }
    }

}

const getters = {
    /**
     * 获取对应code的数据
     */
    getTableHeader: state => code => {
        return state.tableHeader[code];
    }
};

/**
 * 这个是基础配合的处理。可以自行根据项目进行复制调整
 */
export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}