<template>
  <Header class="account-header">
    <template #left>
      <i class="header-left" @click.stop="back"></i>
    </template>
    <template #center>
      <ul class="header-title">
        <li :class="{'active':switchNum ===0}" @click.stop="switchItem(0)">我喜欢的</li>
        <li :class="{'active':switchNum ===1}" @click.stop="switchItem(1)">最近听的</li>
      </ul>
    </template>
    <template #right>
      <i class="header-right"></i>
    </template>
  </Header>
</template>

<script>
import Header from '../../components/Common/Header'
export default {
  name: 'AccountHeader',
  components: {
    Header
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.account-header {
  .header-left {
    @include bg_img("../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../assets/images/more");
  }
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no_wrap();
    > li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
