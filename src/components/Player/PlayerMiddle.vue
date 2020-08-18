<template>
  <swiper :options="swiperOptions" class="player-middle">
    <swiper-slide class="player-middle-cd">
      <div class="player-middle-cd-container" ref="cdContainer">
        <img :src="this.currentSong.picUrl" alt />
      </div>
      <p class>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="player-middle-lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul class="player-middle-lyric-container">
          <li
            v-for="(item,key) in this.currentLyric"
            :key="key"
            :class="{'active' : currentLineNum === key}"
          >{{item}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../../components/Common/ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'player-middle-bullet',
          bulletActiveClass: 'player-middle-bullet-active'
        },
        // 服务器获取数据重新渲染
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdContainer.classList.add('active')
      } else {
        this.$refs.cdContainer.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
    /*   // 高亮歌词同步
      const lineNum = Math.floor(newValue) + ''
      const result = this.currentLyric[lineNum]
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 歌词滚动同步
        const currentLyricTop = document.querySelector('li.active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
        // console.log('1')
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      } */
      // 高亮歌词同步
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // console.log(this.urrentLineNum)
      // 歌词滚动同步
      const currentLyricTop = document.querySelector('.player-middle-lyric .active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        // console.log('1')
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.player-middle {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
}
.player-middle-cd {
  .player-middle-cd-container {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    border: 20px solid #fff;
    margin: 0 auto;
    overflow: hidden;
    animation: sport 15s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }
  > p {
    text-align: center;
    @include font_size($font_medium);
    @include font_color();
    margin-top: 50px;
    color: #fff;
  }
}
.player-middle-lyric {
  li {
    text-align: center;
    @include font_size($font_medium_s);
    @include font_color();
    margin: 10px 0;
    &:last-of-type {
      padding-bottom: 50%;
    }
    &.active {
      color: #d43c33;
    }
  }
}

@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.player-middle-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #ffff;
  margin: 0 10px;
  opacity: 0.5;
}
.player-middle-bullet-active {
  @include bg_color();
  width: 50px;
  opacity: 1;
}
</style>
