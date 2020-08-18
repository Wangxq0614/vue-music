<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <h2 class="header-title">{{title}}</h2>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.header {
  // position: relative;
  // z-index: 999;
  width: 100%;
  height: 100px;
  display: flex;
  @include bg_color();
  justify-content: space-between;
  align-items: center;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../assets/images/more");
  }
  .header-title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no_wrap();
  }
}
</style>
