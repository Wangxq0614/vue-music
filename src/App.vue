<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from './components/Common/MainHeader'
import Tabbar from './components/Common/Tabbar'
import Player from './views/Player/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar,
    Player
  }
}
</script>

<style lang="scss" scoped>
</style>
