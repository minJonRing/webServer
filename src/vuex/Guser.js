import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let Guser = new Vuex.Store({
    state:{
        userId : {}
    },
    mutations:{
        changUser (state,val) {
            state.userId = val
        }
    },
    getters:{
        getUser (state) {
            return state.userId
        }
    },
    actions:{
        setUser ({commit},val) {
            commit('changUser',val)
        }
    }
})

export default Guser;