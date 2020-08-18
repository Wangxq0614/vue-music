<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <ul class="personalized-item">
      <li
        class="personalized-item-list"
        v-for="item in personalized"
        :key="item.id"
        @click="selectItem(item.id)"
      >
        <!-- <img :src="item.picUrl" alt /> -->
        <img v-lazy="item.picUrl" alt />
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    selectItem (id) {
      this.$emit('selectItem', id, this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    > h3 {
      @include font_size($font_large);
      @include font_color();
    }
  }
  .personalized-item {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 20px 0;
  }
  .personalized-item-list {
    width: 30%;
    padding-bottom: 20px;
    img {
      width: 100%;
      border-radius: 25px;
    }
    p {
      @include clamp(2);
      @include font_size($font_medium_s);
      @include font_color();
      line-height: 1.5;
    }
  }
}
</style>
