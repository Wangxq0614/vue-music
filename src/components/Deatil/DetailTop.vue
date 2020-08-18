<template>
  <div class="detail-top">
    <div class="detail-img-container">
      <img :src="path" alt />
      <div class="detail-img-mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  .detail-img-container {
    position: relative;
    img {
      width: 100%;
    }
  }
  .detail-img-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0;
  }
}
</style>
