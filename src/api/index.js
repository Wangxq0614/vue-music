// 接口管理
import Network from './network'

export const getBanner = () => Network.get('/banner', { type: 2 }) // 首页轮播
export const getPersonalized = () => Network.get('/personalized', { limit: 6 }) // 推荐歌单
export const getNewAlbum = () => Network.get('/album/newest') // 最新专辑
export const getNewSong = () => Network.get('/personalized/newsong') // 最新单曲
export const getPlayList = (data) => Network.get('/playlist/detail', { id: data }) // 歌单详情
export const getAlbum = (data) => Network.get('/album', { id: data }) // 专辑详情
export const getSongDetail = (data) => Network.get('/song/detail', { ids: data })// 单曲详情
export const getSongLyric = (data) => Network.get('/lyric', { id: data })// 歌词
export const getSongUrl = (data) => Network.get('/song/url', { id: data })// 歌曲url

export const getTopArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists', { offset: 0, limit: 5 })
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (error) {
        reject(error)
      })
  })
} // 热门歌手
export const getLetterArtists = (data) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 1001, initial: data }),
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 1002, initial: data }),
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 1003, initial: data }),
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 2001, initial: data }),
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 2003, initial: data }),
      Network.get('/artist/list', { offset: 0, limit: 5, cat: 2003, initial: data })
    ])
      .then(function (result) {
        result.forEach((item) => {
          letterArtists.push(...item.artists)
        })
        resolve(letterArtists)
      })
      .catch(function (error) {
        reject(error)
      })
  })
} // 歌手分类
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getTopArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (error) {
        reject(error)
      })
  })
} // 按照 “A-z” 分类歌手

export const getSingerDetail = (data) => Network.get('/artists', { id: data })// 歌手详情
export const getTopList = () => Network.get('/toplist/detail')// 排行榜
export const getTopListDetail = (data) => Network.get('/playlist/detail', { id: data })// 排行榜详情
export const getSearchValue = (data) => Network.get('/search', { type: 1, keywords: data })// 搜索
export const getHotSearch = () => Network.get('/search/hot')// 热门搜索
