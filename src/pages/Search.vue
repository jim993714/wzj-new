<template>
  <div class="search">
    <div class="head">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="back"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="搜索中心"
          v-model.trim="content"
          @input="change"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">
        <span>搜索</span>
      </div>
    </div>
    <div class="list" v-show="recommendList.length > 0">
      <div
        class="test"
        v-for="item in recommendList"
        :key="item.id"
        @click="history_search(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <tab-nav :data="infolist" v-if="infolist.length > 0"></tab-nav>

    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="box">
          <div
            v-for="item in history"
            :key="item"
            @click="history_search(item)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="recommend">
        <h3>热门搜索</h3>
        <div class="box">
          <div v-for="item in hot" :key="item" @click="history_search(item)">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      // 搜索的文字
      content: '',
      // 存放浏览记录的变量
      history: [],
      // 文章列表
      infolist: [],
      // 推荐列表
      recommendList: [],
      // 热门
      hot: ['五月天', '关晓彤', '复工', '新冠', '下雨了'],
    };
  },
  // 进入页面,先拿去本地缓存的浏览记录
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || [];
  },
  methods: {
    async search() {
      if (!this.content) {
        return;
      }
      // 去重:首相拿到content,遍历数组,找到痛痒的数据,删掉
      this.history = this.history.filter((v) => {
        return v != this.content;
      });
      //点击搜索按钮后,将搜索的痕迹放入浏览记录中,并且发送请求

      this.history.unshift(this.content);

      if (this.history.length > 6) {
        this.history.pop();
      }
      // console.log(this.history);
      // 就浏览记录存到本地缓存中;
      localStorage.setItem('history', JSON.stringify(this.history));

      // 发送请求;
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.content,
        },
      });
      const { statusCode, data } = res.data;
      if (statusCode == 200) {
        this.infolist = data;
      }
      this.content = '';
      // 发送请求过,推荐列表的内容也要为空
      this.recommendList = [];
    },
    change: _.debounce(async function() {
      try {
        // console.log('1111');
        const res = await this.$axios.get('/post_search_recommend', {
          params: {
            keyword: this.content,
          },
        });
        // 如果内容为空则不发送请求,推荐列表为空
        if (!this.content) {
          this.recommendList = [];
          return;
        }
        const { statusCode, data } = res.data;
        if (statusCode == 200) {
          this.recommendList = data;
          // console.log(this.recommendList);
        }
      } catch {
        console.log('失败');
      }
    }, 100),
    history_search(item) {
      // 点击搜索记录将记录内容添加到搜索框,并且发送请求
      this.content = item;
      this.search();
    },
    back() {
      // 如果文章列表有文章,则将内容清空, 没有内容则返回上一级
      if (this.infolist.length > 0) {
        this.infolist = [];
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  padding: 5px 10px;
  position: relative;
  .head {
    padding-top: 10px;
    display: flex;
    align-items: center;
    .left {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 15px;
    }
    .center {
      flex: 1;
      padding: 0 10px;
      display: flex;
      position: relative;
      input {
        height: 30px;
        width: 100%;
        line-height: 30px;
        padding-left: 30px;
        font-size: 14px;
        outline: none;
        border: 1px solid #999;
        border-radius: 15px;
      }
      span {
        position: absolute;
        left: 20px;
        top: 10px;
      }
    }
    .right {
      text-align: center;
      width: 40px;
      font-size: 14px;
    }
  }
  .list {
    width: 100%;
    position: absolute;
    z-index: 999;
    background-color: #fff;
    top: 50px;
    left: 0;
    .test {
      margin: 0 20px;
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
  }
  .history {
    padding: 10px 20px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    .box {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 5px;
      }
      span {
        margin: 5px 0;
        padding: 5px;
        font-size: 12px;
        background-color: #ccc;
      }
    }
  }
  .recommend {
    padding: 10px 20px;
    line-height: 30px;
    .box {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        margin: 5px 0;
        padding: 5px;
        background-color: #ccc;
      }
    }
  }
}
</style>
