<template>
  <div class="my-follow">
    <wzj-head>我的关注</wzj-head>
    <div class="main" v-for="item in info" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
      </div>
      <div class="center">
        <div class="titile">
          {{ item.nickname }}
        </div>
        <div class="time">
          {{ item.create_date | date }}
        </div>
      </div>
      <div class="right" @click="cancelFollow(item.id)">
        取消关注
      </div>
    </div>
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
    async cancelFollow(id) {
      try {
        // 点击出现确认框
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认取消关注?',
        });
        //   点击按钮发送请求, 取消关注;
        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`,
        });
        const { statusCode, message } = res.data;
        if (statusCode == 200) {
          this.render();
          this.$toast.success(message);
        }
      } catch {
        return false;
      }
    },
    async render() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_follows',
      });
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.info = data;
        //   console.log(this.info);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-follow {
  .main {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    .left {
      img {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
    }
    .center {
      margin: auto;
      margin-left: 10px;
      flex: 1;
    }
    .right {
      width: 70px;
      line-height: 25px;
      height: 25px;
      text-align: center;
      background-color: #ccc;
      border-radius: 40px;
      margin: auto;
    }
  }
}
</style>
