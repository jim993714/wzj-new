<template>
  <div class="my-active">
    <wzj-head>我的收藏</wzj-head>
    <div class="main" v-for="item in info" :key="item.id">
      <div class="left">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="text">
          <span>{{ item.user.nickname }}</span>
          <span>{{ item.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="item.cover[0].url" alt="" />
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
    async render() {
      const res = await this.$axios.get('/user_star');
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.info = data;
      }
      // console.log(this.info);
    },
  },
};
</script>

<style lang="less" scoped>
.my-active {
  .main {
    display: flex;
    padding: 10px;
    .text {
      padding-top: 5px;
      span {
        margin-right: 5px;
      }
    }
    .right {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
