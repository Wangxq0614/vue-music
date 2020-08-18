<template>
  <div class="account-bottom">
    <div class="account-bottom-play">
      <i></i>
      <span @click="selectAllMusic">播放全部</span>
    </div>
    <div class="account-bottom-container">
      <ScrollView>
        <SongListItem :newSongs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../Common/ScrollView'
import SongListItem from '../Common/SongListItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AccountBottom',
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])

  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'getSongDetail',
      'setCurrentIndex'
    ]),
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    selectAllMusic () {
      // const ids = []
      if (this.switchNum === 0) {
        // ids = this.favoriteList.map((item) => {
        //   return item.id
        // })
        this.SET_SONG_DETAIL(this.favoriteList)
      } else {
        // ids = this.historyList.map((item) => {
        //   return item.id
        // })
        this.SET_SONG_DETAIL(this.historyList)
      }
      // this.getSongDetail([ids])
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
.account-bottom-play {
  width: 260px;
  height: 70px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  @include border_color();
  border-radius: 35px;
  > i {
    display: inline-block;
    width: 46px;
    height: 46px;
    @include bg_img("../../assets/images/small_play");
    margin-right: 20px;
  }
  > span {
    @include font_size($font_medium_s);
    @include font_color();
    font-weight: bold;
    color: #000;
  }
}
.account-bottom-container {
  position: fixed;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  padding-bottom: 130px;
}
</style>
