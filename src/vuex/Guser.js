import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let Guser = new Vuex.Store({
    state:{
        userId : {},
        hint:{txt:"",className:"",bl:false}
    },
    mutations:{
        changUser (state,val) {
            state.userId = val
        },
        changeHint(state,val){
            state.hint = val
        }
    },
    getters:{
        getUser (state) {
            return state.userId
        },
        getHint(state){
            return state.hint
        }
    },
    actions:{
        setUser ({commit},val) {
            commit('changUser',val)
        },
        setHint({commit},val){
            commit('changeHint',val)
        }
    }
})

export default Guser;