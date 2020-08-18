<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  props: {},
  data () {
    return {}
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决iscroll拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
      // click: true
    })
    // 1.创建观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
    mutationList:发生变化的数组
    observer:观察者对象
    */
    const observer = new MutationObserver((mutationsList, observer) => {
      this.iscroll.refresh()
    })
    // // 2.告诉观察者对象需要观察的内容
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      attributes: true, // 观察属性变动
      subtree: true,
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // // 3.告诉观察者对象，需要观察谁，需要观察的内容
    // /*
    //   第一个参数：告诉观察者对象需要观察谁
    //   第二个参数：告诉观察者对象需要观察的内容
    // */
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
