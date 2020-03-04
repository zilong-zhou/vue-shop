<template>
  <div>
    <h2>首页</h2>
    <p>{{$store.state.count}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>

    <category></category>
    <p>**********getters***********</p>
    <p>{{$store.getters.getmore20stu}}</p>
    <p>**********响应式***********</p>
    <p>{{$store.state.info}}</p>
    <button @click="upStuName">修改</button>
  </div>
</template>

<script>
  import Category from '../category/Category'

  export default {
    name: "Home",
    components: {Category},
    comments:{
      Category,
    },
    data() {
      return {
      }
    },
    methods: {
      increment() {
        this.$store.commit("increment")
      },
      decrement() {
        this.$store.commit("decrement")
      },
      upStuName() {
        // this.$store.commit("upStuName")
        this.$store.dispatch('aUpdateInfo')
      },


    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
