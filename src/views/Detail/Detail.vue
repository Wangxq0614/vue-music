<template>
  <div class="detail">
    <DeatilHeader :title="playList.name"></DeatilHeader>
    <DetailTop :path="playList.coverImgUrl" ref="top"></DetailTop>
    <div class="detail-bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playList.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlayList, getAlbum } from '../../api/index'
import DeatilHeader from '../../components/Deatil/DeatilHeader'
import DetailTop from '../../components/Deatil/DetailTop'
import DetailBottom from '../../components/Deatil/DetailBottom'
import ScrollView from '../../components/Common/ScrollView'
export default {
  name: 'Detail',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    DeatilHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playList: {}
    }
  },
  async created () {
    if (this.type === 'personalized') {
      const { playlist } = await getPlayList(this.id)
      this.playList = playlist
    } else if (this.type === 'album') {
      const albums = await getAlbum(this.id)
      this.playList = {
        name: albums.album.name,
        coverImgUrl: albums.album.picUrl,
        tracks: albums.songs
      }
    }
  },
  mounted () {
    /*
    this.$refs.top.$el： 获取根节点
    */
    const oTopHeight = this.$refs.top.$el.offsetHeight
    const oImgScale = this.$refs.top.$el.lastElementChild.lastElementChild
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY > 0) {
        // console.log('向下滚动')
        const scale = 1 + offsetY / oTopHeight
        oImgScale.style.transform = `scale(${scale})`
      } else {
        //  console.log('向上滚动')
        const scale = Math.abs(offsetY) / oTopHeight
        oImgScale.style.opacity = scale
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  @include bg_color();
  background-color: #fff;
  .detail-bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
