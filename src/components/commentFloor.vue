<template>
  <div class="main">
    <comment-floor1
      v-if="commentList.parent"
      :commentList="commentList.parent"
      :count="count - 1"
      @reply="reply"
    ></comment-floor1>
    <div class="comment-floor " :class="{ bd: !commentList.parent }">
      <div class="top">
        <span class="floor">{{ count }}楼</span>
        <span class="nickname">{{ commentList.user.nickname }}</span>
        <span class="time">{{ commentList.create_date | date2 }}</span>
        <span
          class="reply"
          @click="reply(commentList.user.id, commentList.user.nickname)"
          >回复</span
        >
      </div>
      <div class="bottom">
        <span>{{ commentList.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList', 'count'],
  name: 'comment-floor1',
  data() {
    return {};
  },
  created() {
    // console.log(this.commentList);
  },
  methods: {
    reply(sendId, nickname) {
      this.$emit('reply', sendId, nickname);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin-top: 10px;
}
.comment-floor {
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #999;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  padding: 10px 0 0;
  background-color: #ccc;
  padding-bottom: 10px;

  .top {
    margin-left: 10px;
    display: flex;
    .floor {
      font-size: 12px;
      margin-right: 5px;
    }
    .nickname {
      font-size: 12px;
      margin-right: 5px;
    }
    .time {
      flex: 1;
      font-size: 12px;
      color: #999;
    }
    .reply {
      text-align: right;
      font-size: 12px;
      color: #999;
      margin-right: 5px;
    }
  }
  .bottom {
    margin-left: 10px;
    margin-top: 10px;
  }
}
.bd {
  border-top: 1px solid #999;
}
</style>
