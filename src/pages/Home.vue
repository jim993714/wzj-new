<template>
  <div class="home">
    <!-- 个人中心头部 -->
    <div class="head">
      <!-- 头部左侧log -->
      <div class="log">
        <span class="iconfont iconnew"></span>
      </div>
      <!-- 中间搜索框 -->
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>新闻搜索</span>
      </div>
      <!-- 右侧个人中心 -->
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏 使用vant ui的tab 组件 -->
    <van-tabs v-model="active" sticky :swipeable="true">
      <van-tab :title="item.name" v-for="item in tablis" :key="item.id">
        <!-- 文章列表渲染的内容 -->
        <div class="info" v-for="item in tabnav" :key="item.id">
          <div class="left">
            <div class="title">{{ item.title }}</div>
            <div class="text">
              <span>{{ item.user.nickname }}</span>
              <span>{{ item.comment_length }}跟帖</span>
            </div>
          </div>
          <div class="right">
            <img :src="$axios.defaults.baseURL + item.cover[0].url" alt="" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制tab栏的数据属性
      active: 0,
      // 获取的列表数据
      tablis: '',
      tabnav: '',
    };
  },
  async created() {
    // 进入页面获取数据,渲染tablit
    const res = await this.$axios.get('/category');
    const { data, statusCode } = res.data;
    if (statusCode == 200) {
      this.tablis = data;
      console.log(this.tablis);
      this.gettablis(this.tablis[this.active].id);
    }
  },
  methods: {
    async gettablis(id) {
      // 发送请求,渲染文章列表是吗

      const res = await this.$axios({
        method: 'get',
        url: '/post',
        params: {
          category: id,
        },
      });
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.tabnav = data;
        console.log(this.tabnav);
      }
    },
  },
  watch: {
    active(value) {
      // 当active的值变化时,将值改变,并且调用方法渲染文章列表
      this.active = value;
      console.log(this.tablis[this.active].id);
      this.gettablis(this.tablis[this.active].id);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  .head {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: red;
    .log {
      color: #fff;
      span {
        font-size: 54px;
      }
    }
    .user {
      span {
        color: #fff;
        font-size: 24px;
      }
    }
    .user,
    .log {
      width: 50px;
      text-align: center;
      padding: 0 10px;
    }
    .search {
      flex: 1;
      color: #fff;
      text-align: center;
      height: 40px;
      background-color: rgba(243, 237, 237, 0.37);
      border-radius: 20px;
      font-size: 14px;
      line-height: 40px;
      margin-top: 5px;
      span {
        margin-right: 5px;
      }
    }
  }

  .info {
    margin-top: 10px;
    display: flex;
    border-bottom: 1px #ccc solid;
    font-size: 14px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;
      flex: 1;
      .text {
        margin-bottom: 10px;
        span {
          margin-right: 5px;
        }
      }
    }
    .right {
      padding-right: 10px;
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  /deep/ .van-tabs__nav {
    background-color: rgba(228, 228, 228, 1);
  }
}
</style>
