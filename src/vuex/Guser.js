import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let Guser = new Vuex.Store({
    state:{
        userId : "",
        hint:{txt:"",className:"",bl:false},
        web:"",
        group:""
    },
    mutations:{
        changUser (state,val) {
            state.userId = val
        },
        changeHint(state,val){
            state.hint = val
        },
        changeWeb(state,val){
            state.web = val
        },
        changeGroup(state,val){
            state.group = val
        }
    },
    getters:{
        getUser (state) {
            return state.userId
        },
        getHint(state){
            return state.hint
        },
        getWeb(state){
            return state.web
        },
        getGroup(state){
            return state.group
        }
    },
    actions:{
        setUser ({commit},val) {
            commit('changUser',val)
        },
        setHint({commit},val){
            commit('changeHint',val)
        },
        setWeb({commit},val){
            commit('changeWeb',val)
        },
        setGroup({commit},val){
            commit('changeGroup',val)
        }
    }
})

export default Guser;