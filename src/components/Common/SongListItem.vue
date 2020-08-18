<template>
  <div class="song-list-item">
    <ul class="song-item">
      <li
        class="song-item-list"
        v-for="item in newSongs"
        :key="item.id"
        @click="selectMusic(item.id)"
      >
        <img v-lazy="item.picUrl" alt />
        <div class="song-item-list-right">
          <h3>{{item.name}}</h3>
          <p>{{item.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
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
.song-list-item {
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
