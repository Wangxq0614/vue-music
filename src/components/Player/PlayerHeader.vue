<template>
  <div class="header">
    <i class="header-left" @click="hiddenNormalPlayer"></i>
    <div class="header-title">
      <h3>{{this.currentSong.name}}</h3>
      <p>{{this.currentSong.singer}}</p>
    </div>
    <i class="header-right"></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("../../assets/images/down");
  }
  .header-right {
    // @include bg_img("../../assets/images/account");
  }
  .header-title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    overflow: hidden;
    > h3 {
      @include font_size($font_large);
      color: #fff;
      @include no_wrap();
    }
    > p {
      @include font_size($font_small);
      color: #fff;
      @include no_wrap();
    }
  }
}
</style>
