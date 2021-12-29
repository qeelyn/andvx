import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import andvx from '../store/modules/andvx'


// 创建一个新的 store 实例
const store = createStore({
    strict: true,
    modules: {
        andvx,
    },
    plugins: [
        createPersistedState({
            key: 'andvx-test',
            paths: [
                'andvx.tableHeader',
            ],
        })
    ],
})
export default store
