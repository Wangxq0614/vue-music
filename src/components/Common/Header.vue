<template>
  <div class="header" @click="changeTheme">
    <i class="header-left"></i>
    <h2 class="header-title">网易云音乐</h2>
    <i class="header-right" @click.stop="accountClick"></i>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
    accountClick () {
      this.$router.push('/account')
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
  @include bg_color();
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("../../assets/images/logo");
  }
  .header-right {
    @include bg_img("../../assets/images/account");
  }
  .header-title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
