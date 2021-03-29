<template>
  <div class="my-comment">
    <wzj-head>我的跟帖</wzj-head>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="main" v-for="item in info" :key="item.id">
        <div class="time">
          {{ item.create_date | date('YYYY-MM-DD HH:mm') }}
        </div>
        <div v-if="item.parent" class="parent">
          <span>回复:{{ item.parent.user.nickname }}</span>
          <span> {{ item.parent.content }}</span>
        </div>
        <div class="title">
          {{ item.content }}
        </div>
        <div class="info">
          <span class="content">原文:{{ item.post.title }}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  async created() {
    const res = await this.$axios({
      method: 'get',
      url: '/user_comments',
    });
    const { data, statusCode } = res.data;
    if (statusCode == 200) {
      this.info = data;
    }
  },
  data() {
    return {
      info: '',
      finished: false,
      loading: false,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  methods: {
    async onLoad() {
      // 发送请求获取数据
      this.pageIndex++;
      const res = await this.$axios({
        url: '/user_comments',
        method: 'get',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      const { data, statusCode } = res.data;

      if (statusCode == 200) {
        this.info = [...this.info, ...data];
        // 如果请求成功,添加数据并且将loading改成false
        this.loading = false;
      }
      if (data.length < this.pageSize) {
        // 拿去的数据的长度小于pageSize,说明没有数据了,将finished改城true ,显示没有更多了
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-comment {
  .main {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    padding-top: 10px;
    font-size: 14px;
    .time,
    .title,
    .info {
      padding: 0 20px;
      padding-bottom: 10px;
    }
    .time,
    .info {
      display: flex;
      color: #ccc;
      .iconfont {
        text-align: right;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .parent {
    margin: 0 20px;
    padding: 5px 0;
    display: flex;
    line-height: 30px;
    flex-direction: column;
    background-color: rgb(204, 204, 204);
    color: #999;
    span {
      padding: 0 10px;
    }
  }
}
</style>
