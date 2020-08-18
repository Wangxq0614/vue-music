/* eslint-disable no-useless-escape */
/* eslint-disable space-before-function-paren */
import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CUR_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORIET_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'

import {
  getSongDetail,
  getSongLyric,
  getSongUrl
} from '../api/index'
export default {
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setListPlayer({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  async getSongDetail({ commit }, ids) {
    // 获取歌曲信息
    const result = await getSongDetail(ids.join(','))
    // 获取播放地址
    const urls = await getSongUrl(ids.join(','))
    // 保存歌曲信息
    const list = []
    if (result.songs) {
      result.songs.forEach((value, index) => {
        const obj = {}
        // 保存歌曲id
        obj.id = value.id
        // 保存歌曲名称
        obj.name = value.name
        // 保存作者信息
        let singer = ''
        value.ar.forEach((item, index) => {
          if (index === 0) {
            singer = item.name
          } else {
            singer += '-' + item.name
          }
        })
        obj.singer = singer
        // 保存歌曲图片信息
        obj.picUrl = value.al.picUrl
        // 保存播放地址
        for (let j = 0; j < urls.data.length; j++) {
          const item = urls.data[j]
          if (value.id === item.id) {
            obj.url = item.url
            break
          }
        }
        list.push(obj)
      })
    }

    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric({ commit }, id) {
    const result = await getSongLyric(id)
    // 格式化歌词
    const obj = parseLyric(result.lrc.lyric)
    commit(SET_SONG_LYRIC, obj)
  },
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurTime({ commit }, time) {
    commit(SET_CUR_TIME, time)
  },
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORIET_LIST, list)
  },
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}

// 格式化歌词方法
function parseLyric(lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
