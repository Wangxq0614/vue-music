<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide v-for="item in banners" :key="item.bannerId" class="banner-item">
      <img :src="item.pic" alt />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'

        },
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false, // 无限循环滚动
          disableOnInteraction: false // 用户操作swiper后，继续自动轮播
        },
        // 服务器获取数据重新渲染
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  .banner-item {
    img {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
// 覆盖第三方插件的样式时，style不能指定scoped模式
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.banner {
  .swiper-pagination-bullet {
    width: 14px;
    height: 14px;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
