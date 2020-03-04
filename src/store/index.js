import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  count: 100,
  student: [
    {id:1, name:'zzl', age:21},
    {id:2, name:'pengdao', age:22},
    {id:3, name:'liujun', age:18},
    {id:4, name:'dengbin', age:17},
  ],
  info: {
    name: 'zzl',
    age: '20'
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
