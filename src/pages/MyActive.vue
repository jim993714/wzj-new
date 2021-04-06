<template>
  <div class="my-active">
    <wzj-head>我的收藏</wzj-head>
    <tab-nav :data="info"></tab-nav>
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
