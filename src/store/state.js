import mode from './modeType'
export default {
  isFullScreen: false, // 全屏播放界面
  isShowMiniPlayer: false, // mini播放界面
  isPlaying: false, // 播放按钮
  modeType: mode.loop, // 播放模式
  isListPlayer: false, // 列表播放节目
  songs: [], // 歌曲信息
  currentSong: {}, // 当前歌曲
  currentIndex: 0, // 当前歌曲索引
  currentLyric: {}, // 获取歌词
  curTime: 0, // 当前播放时间
  favoriteList: [], // 歌曲收藏
  historyList: [] // 播放历史
}
