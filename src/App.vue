<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <transition>
      <router-view></router-view>
    </transition>
    <Player></Player>
  </div>
</template>

<script>
import Header from './components/Common/Header'
import Tabbar from './components/Common/Tabbar'
import Player from './views/Player/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>

<style lang="scss" scoped>
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>
