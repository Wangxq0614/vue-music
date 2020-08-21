<template>
  <Header class="main-header">
    <i slot="left" class="header-left"></i>
    <h2 slot="center" class="header-title">网易云音乐</h2>
    <i slot="right" class="header-right" @click.stop="accountClick"></i>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.main-header {
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
