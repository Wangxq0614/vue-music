// 接口管理
import Network from './network'

export const getBanner = () => Network.get('/banner', { type: 2 })
export const getPersonalized = () => Network.get('/personalized', { limit: 6 })
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSong = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('/playlist/detail', { id: data })
export const getAlbum = (data) => Network.get('/album', { id: data })
export const getSongDetail = (data) => Network.get('/song/detail', { ids: data })
export const getSongLyric = (data) => Network.get('/lyric', { id: data })
export const getSongUrl = (data) => Network.get('/song/url', { id: data })
