
/* eslint-disable space-before-function-paren */
export default {
  isFullScreen(state) {
    return state.isFullScreen
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer
  },
  isPlaying(state) {
    return state.isPlaying
  },
  modeType(state) {
    return state.modeType
  },
  isListPlayer(state) {
    return state.isListPlayer
  },
  songs(state) {
    return state.songs
  },
  currentSong(state) {
    // 默认播放界面没有数据，初始默认数据
    let obj = {
      name: '',
      singer: '',
      picUrl: null
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentLyric(state) {
    return state.currentLyric
  },
  currentIndex(state) {
    return state.currentIndex
  },
  curTime(state) {
    return state.curTime
  },
  favoriteList(state) {
    return state.favoriteList
  },
  historyList(state) {
    return state.historyList
  }

}
