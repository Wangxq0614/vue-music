<template>
  <div class="account">
    <AccountHeader @switchItem="switchItem"></AccountHeader>
    <AccountBottom :switchNum="switchNum"></AccountBottom>
  </div>
</template>

<script>
import AccountHeader from '../../components/Account/AccountHeader'
import AccountBottom from '../../components/Account/AccountBottom'
import MetaInfo from '../../../vue-meta-info'
export default {
  name: 'Account',
  metaInfo: MetaInfo.account,
  components: {
    AccountHeader,
    AccountBottom
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.account {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
}
</style>
