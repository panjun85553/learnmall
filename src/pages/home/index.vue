<template>
    <div class="home">
      <header class="g-header-container">
        <HomeHeader :class="{'header-transition': isHeaderTransition}" ref="header"/>
      </header>
      <me-scroll
        :data="recommends"
         pullDown
         pullUp
         ref="scroll"
         @pull-up="pullToLoadMore"
         @scroll-end="scrollEnd"
         @scroll="scroll"
         @pull-down-transition-end="pullDownTransitionEnd"
         @pull-down="pullToRefresh">
        <home-slider ref="slider"></home-slider>
        <home-nav></home-nav>
        <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
      </me-scroll>
      <div class="g-backtop-container">
        <me-back-top :visible="isBacktopVisible" @backtop = "backToTop"></me-back-top>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from '../../base/scroll/index';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import MeBackTop from '../../base/backtop/index';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend,
      MeBackTop
    },
    methods: {
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        this.$refs.slider.update().then(end);
      },
      pullToLoadMore(end) {
        this.$refs.recommend.update().then(end).catch(err => {
          if (err) {
            console.log(err);
          }
          end();
        });
      },
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },
      scrollEnd(translate, scroll, pulling) {
        if (!pulling) {
          this.changeHeaderStatus(translate);
        }
        this.isBacktopVisible = translate < 0 && -translate > scroll.height; // 这里是swiper的api 滚过一屏的高度，就是可视区的高度
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }

        this.$refs.header.show();

        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      },
      pullDownTransitionEnd() {
        this.$refs.header.show();
      }
    },
    data() {
      return {
        recommends: [],
        isBacktopVisible: false,
        isHeaderTransition: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import  "../../assets/scss/mixins";
  .home {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
  }
</style>
