<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick = "tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed" />
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">

    <home-swiper :banners="banners"
    @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recsommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick = "tabClick"
                 ref="tabControl2"/>

    <goods-list :goods="goods[currentType].list"/>
  </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getMultiData, getHomeGoods} from 'network/home';
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      RecommendView,
      NavBar,
      HomeSwiper,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },

      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },


      /**
      * 网络请求相关的方法
      */
      getHomeMultiData(){
        getMultiData().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page +=1;
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    created() {
      // 1.请求多个数据
     this.getHomeMultiData()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 3.监听 item 中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY;
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh ;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
   overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
    margin-top: -5px
  }


</style>
