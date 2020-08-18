<template>
  <div class="player-bottom">
    <div class="player-bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="player-bottom-progress-bar" @click.stop="progressClick" ref="progressBar">
        <div class="player-bottom-progress-line" ref="progressLine">
          <div class="player-bottom-progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="player-bottom-controll">
      <span class="mode loop" @click="mode" ref="mode"></span>
      <span class="prev" @click="prev"></span>
      <span class="play" @click="play" ref="play"></span>
      <span class="next" @click="next"></span>
      <span class="favorite" @click="favorite" :class="{'active':isFavorite(currentSong)}"></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/index' // 自定义工具类
export default {
  name: 'PlayerBottom',
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    progressClick (e) {
      // 计算进度条位置
      // const normalLeft = e.target.offsetLeft
      const normalLeft = this.$refs.progressBar.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - normalLeft
      // const progressWidth = e.target.offsetWidth
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 计算当前应该从什么位置播放
      const currentTime = this.totalTime * value
      this.setCurTime(currentTime)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      const result = this.favoriteList.find((currentValue) => {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.add('loop')
        this.$refs.mode.classList.remove('random')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.add('one')
        this.$refs.mode.classList.remove('loop')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
      }
    },
    // 格式化时间
    totalTime (newValue, oldValue) {
      const time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    // 当前播放时间
    currentTime (newValue, oldValue) {
      // 1.格式化当前播放的时间
      const time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2.根据当前播放的时间计算比例
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.player-bottom {
  width: 100%;
  height: 200px;
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
}
.player-bottom-progress {
  width: 80%;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    @include font_size($font_small);
    @include font_color();
    color: #fff;
  }
}
.player-bottom-progress-bar {
  width: 100%;
  height: 10px;
  margin: 0 20px;
  background: #666;
  border-radius: 5px;
  .player-bottom-progress-line {
    width: 0%;
    height: 100%;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    .player-bottom-progress-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(-50%, -50%);
    }
  }
}
.player-bottom-controll {
  width: 80%;
  height: 160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    display: inline-block;
    width: 84px;
    height: 84px;
  }
  .mode {
    &.loop {
      @include bg_img("../../assets/images/loop");
    }
    &.one {
      @include bg_img("../../assets/images/one");
    }
    &.random {
      @include bg_img("../../assets/images/shuffle");
    }
  }
  .prev {
    @include bg_img("../../assets/images/prev");
  }
  .play {
    @include bg_img("../../assets/images/play");
    &.active {
      @include bg_img("../../assets/images/pause");
    }
  }
  .next {
    @include bg_img("../../assets/images/next");
  }
  .favorite {
    @include bg_img("../../assets/images/un_favorite");
    &.active {
      @include bg_img("../../assets/images/favorite");
    }
  }
}
</style>
