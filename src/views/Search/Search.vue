<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt
      />
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model.trim="keywords" v-throttle="search" />
    </div>
    <div class="search-suggest" v-show="keywords!==''">
      <ScrollView>
        <ul>
          <li v-for="item in songs" :key="item.id" @click.stop="selectMusic(item.id)">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt
            />
            <p>{{item.name}}-{{item.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="seatch-hot">
      <h3>热门搜索</h3>
      <ul class="search-hot-item">
        <li
          class="search-hot-list"
          v-for="item in hotSearch"
          :key="item.first"
          @click.stop="selectedHot(item.first)"
        >{{item.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="item in searchHistory" :key="item">
        <div class="search-history-left">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+"
            alt
          />
          <p>{{item}}</p>
        </div>
        <div class="search-history-right">
          <img
            @click.stop="delHistory(item)"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
            alt
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from '../../components/Common/ScrollView'
import { getSearchValue, getHotSearch } from '../../api/index'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../../tools/index'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      songs: [],
      hotSearch: [],
      searchHistory: []
    }
  },
  components: {
    ScrollView
  },
  // 自定义指令
  directives: {
    throttle: {
      // 指令的定义
      inserted (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) {
            return
          }
          flag = false
          timerId && clearInterval(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 500)
        })
      }
    }
  },
  async created () {
    const hotSearch = await getHotSearch()
    this.hotSearch = hotSearch.result.hots
    // 获取本地搜索历史
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    this.searchHistory = getLocalStorage('searchHistory')
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'getSongDetail'
    ]),
    async search () {
      if (this.keywords === '') {
        return
      }
      const searchValue = await getSearchValue(this.keywords)
      this.songs = searchValue.result.songs
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.getSongDetail([id])
      // 去重
      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      this.searchHistory.unshift(this.keywords)
      setLocalStorage('searchHistory', this.searchHistory)
      // 清空输入框
      this.keywords = ''
    },
    selectedHot (keywords) {
      console.log(keywords)
      this.keywords = keywords
      this.search()
    },
    delHistory (name) {
      this.searchHistory = this.searchHistory.filter((item) => {
        return item !== name
      })
      setLocalStorage('searchHistory', this.searchHistory)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.search {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background-color: #ebecec;
    border-radius: 30px;
    > img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    > input {
      height: 60px;
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium_s);
      margin-left: 20px;
    }
  }
}
.search-suggest {
  position: fixed;
  top: 300px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  li {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    > img {
      width: 40px;
      height: 40px;
    }
    > p {
      margin-left: 20px;
      @include font_color();
      @include font_size($font_medium);
      @include no_wrap();
    }
  }
}
.seatch-hot {
  > h3 {
    @include font_color();
    @include font_size($font_medium);
    padding: 10px 20px;
  }
  .search-hot-item {
    display: flex;
    flex-wrap: wrap;
  }
  .search-hot-list {
    height: 60px;
    line-height: 60px;
    border: 1px solid #000;
    border-radius: 30px;
    padding: 0 20px;
    @include font_color();
    @include font_size($font_medium_s);
    margin: 10px;
  }
}
.search-history {
  margin-top: 20px;
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 10px 40px;
    border-bottom: 1px solid #ccc;
  }
}
.search-history-left {
  display: flex;
  align-items: center;
  > img {
    width: 40px;
    height: 40px;
  }
  > p {
    @include font_size($font_medium_s);
    @include font_color();
    margin-left: 20px;
  }
}
.search-history-right {
  > img {
    width: 30px;
    height: 30px;
  }
}
</style>
