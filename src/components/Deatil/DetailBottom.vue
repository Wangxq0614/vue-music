<template>
  <ul class="detail-bottom">
    <li class="detail-bottom-top">
      <i class="detail-bottom-top-icon"></i>
      <p class="detail-bottom-top-title" @click="selectAllMusic">播放全部</p>
    </li>
    <li
      v-for="item in playlist"
      :key="item.id"
      class="detail-bottom-item"
      @click="selectMusic(item.id)"
    >
      <h3>{{item.name}}</h3>
      <p>{{item.al.name}} - {{item.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'getSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.getSongDetail([id])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      const ids = this.playlist.map((item) => {
        return item.id
      })
      this.getSongDetail([ids])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.detail-bottom {
  width: 100%;
  height: 100%;
  @include bg_color();
  background-color: #fff;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  > li {
    width: 100%;
    padding: 20px;
    @include bg_color();
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
}
.detail-bottom-top {
  display: flex;
  align-items: center;
  @include bg_color();
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
.detail-bottom-top-icon {
  width: 60px;
  height: 60px;
  @include bg_img("../../assets/images/small_play");
  margin-right: 20px;
}
.detail-bottom-top-title {
  @include font_color();
  @include font_size($font_large);
}
.detail-bottom-item {
  > h3 {
    @include font_color();
    @include font_size($font_medium);
    @include no_wrap();
  }
  > p {
    @include font_color();
    @include font_size($font_small);
    @include no_wrap();
    margin-top: 10px;
    opacity: 0.8;
  }
  &:last-of-type {
    margin-bottom: 130px;
  }
}
</style>
