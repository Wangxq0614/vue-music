<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-item">
      <li
        class="song-item-list"
        v-for="item in newSongs"
        :key="item.id"
        @click="selectMusic(item.id)"
      >
        <!-- <img :src="item.picUrl" alt /> -->
        <img v-lazy="item.picUrl" alt />
        <div class="song-item-list-right">
          <h3>{{item.name}}</h3>
          <p>{{item.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    newSongs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'getSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.getSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.song {
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    > h3 {
      @include font_size($font_large);
      @include font_color();
    }
  }
  .song-item {
    padding: 20px 0;
  }
  .song-item-list {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 15%;
      border-radius: 12px;
    }
  }
  .song-item-list-right {
    overflow: hidden;
    margin-left: 20px;
    > h3 {
      @include font_size($font_large);
      @include font_color();
      margin-bottom: 25px;
      @include no-wrap();
    }
    > p {
      @include font_size($font_small);
      @include font_color();
      opacity: 0.6;
      @include no-wrap();
    }
  }
}
</style>
