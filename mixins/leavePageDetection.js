import { onBeforeRouteLeave } from "vue-router";

/**
 *  说明：
 *      本功能检测的是 save.disabled === false
 * 
 *  使用要点：
 *      1.组件必须暴露save.disabled给与判断
 *      2.由于vue3去掉了$children所以改为$refs来代替引入组件的下级查找判断
 * 
 *  使用方式： 
 *      mixins: [leavePageDetection]
 * 
 *  demo：
 *      src/views/form/index.vue
 * 
 */

const tipStr = '还有未保存内容，是否离开！';

export default {
    mounted() {
        onBeforeRouteLeave((to, form) => {
            if (!this._detectionBtnIsSave()) {
                if (!confirm(tipStr)) {
                    this.$store.dispatch('andvx/resetInitMenu')
                    return false;
                }
            }
        })

        window.addEventListener('beforeunload', this._beforeunloadFn)
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this._beforeunloadFn)
    },

    methods: {
        _beforeunloadFn(event) {
            if (!this._detectionBtnIsSave()) {
                event.preventDefault();
                event.returnValue = tipStr;
                return tipStr
            }
        },
        //检测save.disabled === false
        _detectionBtnIsSave(refs) {
            let self = this,
                isTrue = true;
            if (refs) {
                for (let key in refs) {
                    if (refs[key]) {
                        if (refs[key].save && refs[key].save.disabled === false) {
                            isTrue = false
                        } else if (refs[key].$refs) {
                            isTrue = self._detectionBtnIsSave(refs[key].$refs);
                        }

                        if (!isTrue) {
                            break;
                        }
                    }
                }
            } else {
                if (self.save && self.save.disabled === false) {
                    isTrue = false
                } else {
                    isTrue = self._detectionBtnIsSave(self.$refs)
                }
            }
            return isTrue;
        }
    }
}