<template>
  <Header class="detail-header">
    <template #left>
      <i slot="left" class="header-left" @click.stop="back"></i>
    </template>
    <template #center>
      <h2 slot="center" class="header-title">{{title}}</h2>
    </template>
    <template #right>
      <i slot="right" class="header-right"></i>
    </template>
  </Header>
</template>

<script>
import Header from '../../components/Common/Header'
export default {
  name: 'DetailHeader',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },

  components: {
    Header
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.detail-header {
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
