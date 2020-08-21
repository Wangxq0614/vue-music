<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio :src="this.currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../../components/Player/NormalPlayer'
import MiniPlayer from '../../components/Player/MiniPlayer'
import ListPlayer from '../../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../../store/modeType'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../../tools/index'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  created () {
    // const favList = JSON.parse(window.localStorage.getItem('favorite'))
    // const hisList = JSON.parse(window.localStorage.getItem('history'))
    const favList = getLocalStorage('favorite')
    const hisList = getLocalStorage('history')
    if (favList === null) {
      return
    }
    this.setFavoriteList(favList)
    if (hisList === null) {
      return
    }
    this.setHistoryList(hisList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'isFullScreen',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurTime',
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    // 播放结束
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      // window.localStorage.setItem('favorite', JSON.stringify(newValue))
      setLocalStorage('favorite', newValue)
    },
    historyList (newValue, oldValue) {
      // console.log(newValue)
      // window.localStorage.setItem('history', JSON.stringify(newValue))
      setLocalStorage('history', newValue)
    }
  }

}
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99999;
}
</style>
