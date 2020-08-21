<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="this.isListPlayer">
      <div class="list-player-container">
        <div class="list-player-top">
          <div class="list-player-top-left">
            <i class="mode loop" @click.stop="mode" ref="mode"></i>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-if="this.modeType === 1">单曲循环</p>
            <p v-if="this.modeType === 2">随机播放</p>
          </div>
          <div class="list-player-top-right">
            <i class="del" @click.stop="delAll"></i>
          </div>
        </div>
        <div class="list-player-middle">
          <ScrollView ref="scrollView">
            <ul ref="play">
              <li
                class="list-player-item"
                v-for="(item,index) in songs"
                :key="item.id"
                @click.stop="selectMusic(index)"
              >
                <div class="list-player-item-left">
                  <i
                    class="list-player-item-play"
                    @click.stop="play"
                    v-show="currentIndex === index"
                  ></i>
                  <p>{{item.name}}</p>
                </div>
                <div class="list-player-item-right">
                  <i
                    class="list-player-item-favorite"
                    @click.stop="favorite(item)"
                    :class="{'active':isFavorite(item)}"
                  ></i>
                  <i class="list-player-item-del" @click.stop="del(index)"></i>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="list-player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../../components/Common/ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isListPlayer',
      'songs',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setMiniPlayer',
      'setFavoriteSong'
    ]),
    hidden () {
      this.setListPlayer(false)
      this.setMiniPlayer(true)
    },
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
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, () => done())
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveDownOut', { duration: 500 }, () => done())
    },
    favorite (value) {
      this.setFavoriteSong(value)
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
    isListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  @include bg_sub_color();
  .list-player-container {
    width: 100%;
    height: 100%;
  }
}
.list-player-top {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-player-top-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
  .mode {
    display: inline-block;
    width: 56px;
    height: 56px;
    margin-right: 20px;
    &.loop {
      @include bg_img("../../assets/images/small_loop");
    }
    &.one {
      @include bg_img("../../assets/images/small_one");
    }
    &.random {
      @include bg_img("../../assets/images/small_shuffle");
    }
  }
  > p {
    @include font_color();
    @include font_size($font_medium_s);
  }
}
.list-player-top-right {
  .del {
    display: inline-block;
    width: 84px;
    height: 84px;
    @include bg_img("../../assets/images/small_del");
  }
}
.list-player-middle {
  width: 100%;
  height: 500px;
  overflow: hidden;
  ul {
    width: 100%;
    &.active {
      .list-player-item-play {
        @include bg_img("../../assets/images/small_pause");
      }
    }
  }
}
.list-player-item {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #ccc;
}
.list-player-item-left {
  display: flex;
  align-items: center;
  overflow: hidden;
  .list-player-item-play {
    display: inline-block;
    width: 56px;
    height: 56px;
    margin-right: 20px;
    @include bg_img("../../assets/images/small_play");
  }
  > p {
    flex: 1;
    @include no_wrap();
    @include font_color();
    @include font_size($font_medium_s);
  }
}
.list-player-item-right {
  display: flex;
  align-items: center;
  .list-player-item-favorite {
    display: inline-block;
    width: 56px;
    height: 56px;
    @include bg_img("../../assets/images/small_un_favorite");
    &.active {
      @include bg_img("../../assets/images/small_favorite");
    }
  }
  .list-player-item-del {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 20px;
    @include bg_img("../../assets/images/small_close");
  }
}
.list-player-bottom {
  width: 100%;
  height: 100%;
  line-height: 100px;
  @include bg_color();
  > p {
    text-align: center;
    @include font_color();
    @include font_size($font_medium);
    color: #fff;
  }
}
</style>
