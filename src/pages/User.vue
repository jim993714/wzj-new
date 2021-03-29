<template>
  <div class="user">
    <wzj-head>个人中心</wzj-head>
    <div class="user-top">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center" @click="$router.push('./Edit')">
        <span v-if="info.gender == 1" class="iconfont iconxingbienan"></span>
        <span v-else class="iconfont iconxingbienv"></span>
        <span>{{ info.nickname }}</span>
        <div>
          <span>{{ info.create_date | date }}</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <nav-bar
      title="我的关注"
      content="关注的用户"
      @click="$router.push('/myfollow')"
    ></nav-bar>
    <nav-bar
      title="我的跟帖"
      content="跟帖/回复"
      @click="$router.push('/mycomment')"
    ></nav-bar>
    <nav-bar
      title="我的收藏"
      content="文章/视频"
      @click="$router.push('/myactive')"
    ></nav-bar>
    <nav-bar title="设置" @click="$router.push('/Edit')"></nav-bar>
    <nav-bar title="退出" @click="edit"></nav-bar>
  </div>
</template>

<script>
export default {
  created() {
    this.render();
  },
  data() {
    return {
      info: '',
    };
  },
  methods: {
    async edit() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定退出登录?',
        });
        // 点击确认,删除本地缓存的token和ID 并跳转
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.$router.push('/login');
      } catch {
        return;
      }
    },
    async render() {
      let id = localStorage.getItem('id');
      const res = await this.$axios({
        method: 'get',
        url: `/user/${id}`,
      });
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.info = data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .user-top {
    padding: 0 20px;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-bottom: 2px solid #ccc;
    .left {
      width: 70px;
      img {
        border-radius: 50%;
        width: 70px;
        height: 70px;
      }
    }
    .right {
      width: 30px;
      text-align: right;
    }
    .center {
      flex: 1;
      margin-left: 10px;
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
}
</style>
