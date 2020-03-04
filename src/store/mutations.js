export default {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
  upStuName(state) {
    state.info.name = 'coderwhy'

    // Vue.set(state.info,'name','aaa')

    // setTimeout(() => {
    //   state.info.name = 'coderwhy'
    // },1000)

    // console.log(state.info);
  }
}
