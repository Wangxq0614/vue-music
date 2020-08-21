<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="mini-player-container">
        <div class="mini-player-left" @click="showNormalPlayer">
          <img :src="this.currentSong.picUrl" ref="miniCdContainer" />
          <div class="mini-player-title">
            <h3>{{this.currentSong.name}}</h3>
            <p>{{this.currentSong.singer}}</p>
          </div>
        </div>
        <div class="mini-player-right">
          <i class="play" @click="play" ref="play"></i>
          <i class="list" @click.stop="showList"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showList () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, () => done())
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, () => done())
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.miniCdContainer.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.miniCdContainer.classList.remove('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 130px;
  z-index: 9999;
  @include bg_color();
  .mini-player-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.mini-player-left {
  display: flex;
  padding-left: 30px;
  > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
    animation: sport 15s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
  }
  .mini-player-title {
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    > h3 {
      @include font_size($font_medium);
      @include font_color();
      color: #fff;
    }
    > P {
      @include font_size($font_small);
      @include font_color();
      color: #fff;
    }
  }
}
.mini-player-right {
  display: flex;
  align-items: center;
  .play {
    display: inline-block;
    width: 84px;
    height: 84px;
    @include bg_img("../../assets/images/play");
    &.active {
      @include bg_img("../../assets/images/pause");
    }
  }
  .list {
    display: inline-block;
    width: 110px;
    height: 110px;
    @include bg_img("../../assets/images/list");
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
