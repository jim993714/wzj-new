<template>
  <div class="detail" ref="detail">
    <!-- 头部 -->
    <div class="head">
      <div class="left">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="isFollow" @click="cancel()" v-if="info.has_follow">
          <span>已关注</span>
        </div>
        <div class="follow" @click="follow()" v-else>
          <span>关注</span>
        </div>
      </div>
    </div>
    <!-- 标题 -->
    <div class="title">{{ info.title }}</div>
    <!-- 作者和时间 -->
    <div class="user">
      <span class="nickname">{{ info.user.nickname }}</span>
      <span class="time">{{ info.create_date | date }}</span>
    </div>
    <!-- 内容 -->
    <div class="info" v-html="info.content" v-if="info.type == 1">
      为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：
    </div>
    <!-- 视频内容 -->
    <!-- <div class="info" v-else>
      <video :src="info.content"></video>
    </div> -->
    <!-- 点赞及分享微信 -->
    <div class="btns">
      <div :class="['like', { active: info.has_like }]" @click="like">
        <span class="iconfont icondianzan"></span
        ><span>{{ info.like_length || 0 }}</span>
      </div>
      <div class="wechan">
        <span class="iconfont iconweixin"></span><span>微信</span>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comments">
      <!-- 标题 -->
      <div class="comments-title">
        <span>精彩评论</span>
      </div>
      <!-- 内容 -->
      <div v-if="info.comment_length > 0">
        <comment-list
          :commentList="item"
          v-for="item in commentList"
          :key="item.id"
          @reply="focus"
        ></comment-list>
      </div>
      <div class="null" v-else><span>暂无精彩跟帖,抢沙发了</span></div>
    </div>
    <!-- 底部评论 -->
    <div class="footer" v-if="isshow">
      <input type="text" placeholder="写跟帖" @focus="focus" />
      <div class="icon">
        <span class="iconfont iconpinglun-">
          <span class="num">{{ info.comment_length }}</span>
        </span>
        <span
          :class="['iconfont', 'iconshoucang', { red: info.has_star }]"
          @click="comment"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
    <!-- input框获取焦点的时候显示的 -->
    <div class="btn-foot" v-else>
      <textarea
        :placeholder="`回复:${nickname || ''}`"
        @blur="blur"
        ref="text"
        v-model.trim="content"
      ></textarea>
      <div class="send" @click="send">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  // 进入页面发送请求,获取传过来的文章ID
  created() {
    this.render();
    this.getcomment();
    // console.log(this.commentList);
  },
  data() {
    return {
      info: {
        user: '',
      },
      isshow: true,
      commentList: '',
      // 控制跟帖内容切换
      commentTrue: [],
      // 发送的评论内容
      content: '',
      // 回复内容的ID
      parent_id: '',
      // 回复的昵称
      nickname: '',
    };
  },
  methods: {
    //   渲染页面
    async render() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`);
      const { data, statusCode } = res.data;
      // 将数据赋值
      if (statusCode == 200) {
        this.info = data;
      }
      // console.log(data);
    },
    // 取消关注
    async cancel() {
      console.log(this.info);
      //首先判断有没有登录,如果没有登录则去登录页登录
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({
          path: '/login',
          name: 'login',
          params: {
            back: true,
          },
        });
        return;
      }
      let id = this.info.user.id;
      // 登录的用户发送请求 取消关注
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      const { statusCode, message } = res.data;
      if (statusCode == 200) {
        this.$toast(message);
        // 重新渲染页面
        this.render();
      }
    },
    // 关注用户
    async follow() {
      //首先判断有没有登录,如果没有登录则去登录页登录
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({
          path: '/login',
          name: 'login',
          params: {
            back: true,
          },
        });
        return;
      }
      let id = this.info.user.id;
      const res = await this.$axios.get(`/user_follows/${id}`);
      const { statusCode, message } = res.data;
      if (statusCode == 200) {
        this.$toast(message);
        // 重新渲染页面
        this.render();
      }
    },
    // 点赞功能
    async like() {
      // 首先判断有没有登录
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({
          path: '/login',
          name: 'login',
          params: {
            back: true,
          },
        });
        return;
      }
      // 获取文章ID
      let id = this.info.id;
      // 点击发送请求
      let res = await this.$axios.get(`/post_like/${id}`);
      const { statusCode, message } = res.data;
      if (statusCode == 200) {
        this.$toast(message);
        // 渲染页面
        this.render();
      }
    },
    // 点击显示发送的文本框
    focus(parent_id, nickname) {
      this.parent_id = parent_id;
      this.nickname = nickname;
      // console.log(this.parent_id, this.nickname);

      this.isshow = false;
      this.$nextTick(() => {
        this.$refs.text.focus();
      });
      // 显示发送框让滚动条翻到最低处
      this.$refs.detail.scrollIntoView();
    },
    // 失去焦点后回复原来的底部
    blur() {
      console.log('失去焦点了');
      if (!this.content) {
        this.isshow = true;
      }
    },
    // 收藏文章
    async comment() {
      // 先判断有没有登录

      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({
          path: '/login',
          name: 'login',
          params: {
            back: true,
          },
        });
        return;
      }
      // 发送收藏请求
      //  获取ID
      let id = this.info.id;
      const res = await this.$axios.get(`/post_star/${id}`);
      let { statusCode, message } = res.data;
      if (statusCode == 200) {
        this.$toast(message);
        this.render();
      }
    },
    // 进入页面要渲染评论列表
    async getcomment() {
      let id = this.$route.params.id;
      const res = await this.$axios.get(`/post_comment/${id}`);
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.commentList = data;
      }
      //   console.log(res.data.data);
    },

    // 点击发送按钮,添加最新的跟帖
    async send() {
      // 将回复的昵称显示在文本域内

      // 获取文章的ID
      let id = this.$route.params.id;
      // console.log(id, this.content);
      // 发送请求
      if (!this.content) {
        // return;
      }
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parent_id,
      });
      const { statusCode, message } = res.data;
      if (statusCode == 200) {
        this.getcomment();
        this.render();
        this.$toast(message);
        this.nickname = '';
      }
      this.isshow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .head {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    padding: 10px 20px;

    .left {
      font-size: 15px;
    }
    .center {
      flex: 1;
      span {
        font-size: 54px;
        margin-left: 5px;
      }
    }
    .right {
      margin-right: 5px;
      font-size: 14px;
      background-color: red;
      width: 62px;
      padding: 3px 0;
      text-align: center;
      border-radius: 15px;
      color: #fff;
    }
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    padding: 0 20px;
    padding-bottom: 5px;
  }
  .user {
    padding: 0 20px;
    font-size: 14px;
    span {
      margin-right: 10px;
      color: #666;
    }
    padding-bottom: 10px;
  }
  .info {
    padding: 0 20px;
    font-size: 14px;
    line-height: 30px;
    /deep/ img {
      width: 100%;
    }
    video {
      width: 100%;
    }
  }
  .comments {
    margin: 20px auto;
    .comments-title {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
    .null {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
  }
  .btns {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    div {
      width: 80px;
      height: 30px;
      border: 1px #ccc solid;
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      span {
        font-size: 12px;
        padding-right: 5px;
      }
      .iconfont {
        font-size: 16px;
      }
      .iconweixin {
        color: green;
      }
    }
    .wechan {
      border: 1px green solid;
    }
    .active {
      border: 1px red solid;
      color: red;
    }
  }
  .footer {
    padding: 0 20px;
    display: flex;
    height: 50px;
    align-items: center;
    margin-top: 20px;
    input {
      height: 30px;
      border-radius: 15px;
      outline: none;
      border: none;
      padding-left: 10px;
      background-color: #ccc;
      font-size: 14px;
      width: 181px;
    }
    .icon {
      display: flex;
      flex: 1;
      justify-content: space-around;
      margin-left: 20px;
      span {
        font-size: 23px;
      }
      .iconpinglun- {
        position: relative;
        span {
          background-color: red;
          position: absolute;
          left: 12px;
          top: -3px;
          color: #fff;
          font-size: 10px;
          border-radius: 5px;
          text-align: center;
        }
      }
      .red {
        color: red;
      }
    }
  }
  .btn-foot {
    padding: 0 20px;

    display: flex;
    height: 110px;
    margin-top: 20px;
    textarea {
      height: 90px;
      width: 240px;
      background-color: #ccc;
      border-radius: 10px 10px 0 0;
      outline: none;
      border: none;
      padding: 10px 10px 0;
      font-size: 14px;
    }
    .send {
      height: 26px;
      width: 60px;
      line-height: 26px;
      background-color: red;
      color: #fff;
      border-radius: 13px;
      text-align: center;
      align-self: flex-end;
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
