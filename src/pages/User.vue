<template>
  <div class="user">
    <wzj-head>个人中心</wzj-head>
    <div class="user-top">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
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
    <nav-bar title="我的关注" content="关注的用户"></nav-bar>
    <nav-bar title="我的跟帖" content="跟帖/回复"></nav-bar>
    <nav-bar title="我的收藏" content="文章/视频"></nav-bar>
    <nav-bar title="设置"></nav-bar>
    <nav-bar title="退出" @edit="edit"></nav-bar>
  </div>
</template>

<script>
export default {
  created() {
    // 将ID和token 存到本地缓存中
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    // 发送请求获取用户的信息
    this.$axios({
      method: 'get',
      url: `/user/${id}`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      const { data } = res.data;
      this.info = data;
    });
  },
  data() {
    return {
      info: '',
    };
  },
  methods: {
    edit() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '确定退出登录?',
        })
        .then(() => {
          // 点击确认,删除本地缓存的token和ID 并跳转
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          this.$router.push('/login');
        })
        .catch(() => {});
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
