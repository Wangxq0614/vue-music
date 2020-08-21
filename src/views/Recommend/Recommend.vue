<template>
  <div class="recommend">
    <div class="recommend-container">
      <ScrollView ref="scrollView">
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @selectItem="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="newAlbums"
            :title="'最新专辑'"
            @selectItem="fatherSelectItem"
            :type="'album'"
          ></Personalized>
          <SongList :newSongs="newSongs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../../api/index'
import Banner from '../../components/Recommend/Banner'
import Personalized from '../../components/Recommend/Personalized'
import SongList from '../../components/Recommend/SongList'
import ScrollView from '../../components/Common/ScrollView'
import MetaInfo from '../../../vue-meta-info'
export default {
  name: 'Recommend',
  metaInfo: MetaInfo.recommend,
  data () {
    return {
      banners: [],
      personalized: [],
      newAlbums: [],
      newSongs: []
    }
  },
  async created () {
    const banner = await getBanner()
    const personalized = await getPersonalized()
    const newAlbum = await getNewAlbum()
    const newSong = await getNewSong()
    this.banners = banner.banners
    this.personalized = personalized.result
    this.newAlbums = newAlbum.albums.slice(0, 6)
    // this.newSongs = newSong.result
    // console.log(newSong.result)
    const list = []
    newSong.result.forEach((value) => {
      const obj = {}
      obj.id = value.id
      obj.name = value.name
      obj.picUrl = value.song.album.picUrl
      let singer = ''
      for (let i = 0; i < value.song.artists.length; i++) {
        if (i === 0) {
          singer = value.song.artists[i].name
        } else {
          singer += '-' + value.song.artists[i].name
        }
      }
      obj.singer = singer
      list.push(obj)
    })
    this.newSongs = list
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  watch: {
    personalized () {
      this.$nextTick(() => {
        this.$refs.scrollView.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.recommend {
  width: 100%;
  height: 100%;
  .recommend-container {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>
