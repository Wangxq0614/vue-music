<template>
  <ul class="tabbar">
    <router-link tag="li" class="tabbar-item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="li" class="tabbar-item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="li" class="tabbar-item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="li" class="tabbar-item" to="/search">
      <span>搜索</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.tabbar {
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-around;
  @include bg_sub_color();
}
.tabbar-item {
  span {
    line-height: 84px;
    @include font_size($font_medium);
    @include font_color();
  }
  &.router-link-active {
    border-bottom: 5px solid #000;
    @include border_color();
    span {
      @include font_active_color();
    }
  }
}
</style>
