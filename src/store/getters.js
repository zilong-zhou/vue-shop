export default {
  getmore20stu(state){
    return state.student.filter(stu => stu.age > 20)
  }
}
