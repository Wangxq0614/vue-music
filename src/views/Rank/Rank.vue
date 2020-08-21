<template>
  <div class="rank">
    <div class="rank-container">
      <ScrollView>
        <ul>
          <li class="rank-item" v-for="(item,key) in category.titles " :key="key">
            <h3 class="rank-title">{{item}}</h3>
            <ul class="normal-group" v-if="item === '官方榜'">
              <li
                class="rank-list"
                v-for="obj in category[key]"
                :key="obj.id"
                @click.stop="selectItem(obj.id)"
              >
                <div class="rank-list-left">
                  <img v-lazy="obj.coverImgUrl" alt />
                  <p>{{obj.updateFrequency}}</p>
                </div>
                <div class="rank-list-right">
                  <p
                    v-for="(song,index) in obj.tracks"
                    :key="song.first"
                  >{{index}}.{{song.first}}-{{song.second}}</p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li
                class="rank-list"
                v-for="obj in category[key]"
                :key="obj.id"
                @click.stop="selectItem(obj.id)"
              >
                <div class="rank-list-top">
                  <img v-lazy="obj.coverImgUrl" alt />
                  <p>{{obj.updateFrequency}}</p>
                </div>
                <div class="rank-list-bottom">
                  <p>{{obj.name}}</p>
                </div>
              </li>
              <li class="rank-list" v-if="category[key].lenth % 3 !== 0"></li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopList } from '../../api/index'
import ScrollView from '../../components/Common/ScrollView'
export default {
  name: 'Rank',
  data () {
    return {
      category: {
        titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' },
        officialList: [],
        recList: [],
        globalList: [],
        otherList: []
      }
    }
  },
  async created () {
    const data = await getTopList()
    this.category.officialList = data.list.slice(0, 4)
    this.category.recList = data.list.slice(4, 10)
    this.category.globalList = data.list.slice(10, 16)
    this.category.otherList = data.list.slice(16)
    console.log(this.category)
  },
  components: {
    ScrollView
  },
  methods: {
    selectItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.rank {
  width: 100%;
  height: 100%;
  .rank-container {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
  }
}
.rank-item {
  .rank-title {
    padding: 10px 20px;
    @include font_color();
    @include font_size($font_large);
    font-weight: bold;
  }
}
.normal-group {
  .rank-list {
    display: flex;
    align-items: center;
    padding: 10px 20px;
  }
}
.rank-list-left {
  position: relative;
  > img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }

  > p {
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #fff;
    @include font_size($font_medium_s);
  }
}
.rank-list-right {
  margin-left: 20px;
  overflow: hidden;
  > p {
    @include font_size($font_medium_s);
    @include font_color();
    @include no_wrap();
    padding: 10px 0;
  }
}
.other-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .rank-list {
    width: 30%;
    padding: 10px 20px;
  }
}
.rank-list-top {
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  > p {
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #fff;
    @include font_size($font_medium_s);
  }
}
.rank-list-bottom {
  width: 200px;
  overflow: hidden;
  > p {
    @include font_size($font_medium_s);
    @include font_color();
    @include no_wrap();
    padding: 10px 0;
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
