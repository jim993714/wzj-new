<template>
  <div class="wzj-login">
    <wzj-head>登录</wzj-head>
    <wzj-log></wzj-log>
    <wzj-input
      type="text"
      placeholder="手机号码 / 用户名"
      message="用户名格式不正确"
      :rule="/^1\d{4,10}$/"
      v-model="username"
    ></wzj-input>
    <wzj-input
      type="password"
      placeholder="密码"
      message="密码格式不正确"
      :rule="/^1\w{3,8}$/"
      v-model="password"
    ></wzj-input>
    <wzj-btn @login="login">登录</wzj-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // 使用axios发送请求
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wzj-login {
  margin: 20px;
}
</style>
