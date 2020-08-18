<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :newSongs="newSongs"></SongListItem>
  </div>
</template>

<script>
import SongListItem from '../../components/Common/SongListItem'
export default {
  name: 'SongList',
  props: {
    newSongs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    SongListItem
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
}
</style>
