import { onBeforeRouteLeave } from "vue-router";

/**
 *  使用 mixins 引入 
 *  由于vue3去掉了$children 所以改为$refs来代替 因此需要列入检测的组件需要增加ref
 *  mixins: [leavePageDetection], 
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
            event.preventDefault();
            if (!this._detectionBtnIsSave()) {
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