<template>
  <div class="commentList">
    <div class="comments-info">
      <div class="top">
        <div class="left">
          <img :src="$axios.defaults.baseURL + commentList.user.head_img" />
        </div>
        <div class="center">
          <span class="nickname"> {{ commentList.user.nickname }} </span>
          <span class="time"> {{ commentList.create_date | date2 }}</span>
        </div>
        <div class="right" @click="reply()">
          <span>回复</span>
        </div>
      </div>
      <comment-floor
        :commentList="commentList.parent"
        :count="getCount(0, commentList)"
        v-if="commentList.parent"
        @reply="reply"
      ></comment-floor>
      <div class="bottom">
        <span>{{ commentList.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList', 'focus'],
  created() {
    // console.log(this.commentList);
  },
  data() {
    return {
      // 回复的id

      sendId: this.commentList.id,
      // 回复的昵称
      nickname: this.commentList.user.nickname,
    };
  },
  methods: {
    getCount(num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent);
      } else {
        return num;
      }
    },
    reply() {
      this.$emit('reply', this.sendId, this.nickname);
    },
  },
};
</script>

<style lang="less" scoped>
.comments-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  .top {
    padding: 0 20px;
    display: flex;
    align-items: center;
    .left {
      img {
        width: 35px;
        display: block;
        border-radius: 50%;
      }
    }
    .center {
      margin-left: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .right {
      font-size: 12px;
    }
  }
  .bottom {
    margin: 0 20px;
    font-size: 13px;
    padding: 20px 0;
  }
}
.null {
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}
</style>
