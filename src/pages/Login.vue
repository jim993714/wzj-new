<template>
  <div class="wzj-login">
    <wzj-head>登录</wzj-head>
    <wzj-log></wzj-log>
    <wzj-input
      type="text"
      placeholder="手机号码 / 用户名"
      message="用户名不正确"
      :rule="/^1\d{4,10}$/"
      v-model="username"
      ref="username"
    ></wzj-input>
    <wzj-input
      type="password"
      placeholder="密码"
      message="密码不正确"
      :rule="/^1\w{2,8}$/"
      v-model="password"
      ref="password"
    ></wzj-input>
    <wzj-btn @click="login">登录</wzj-btn>
    <div class="register">
      <span
        >未注册账号?点击<router-link to="/register">注册</router-link>
      </span>
    </div>
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
  created() {
    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
    console.log(this.$route.params);
  },
  methods: {
    async login() {
      // 在发送请求前,先进行校验,如果用户名和密码都通过校验才能发送请求
      if (!this.$refs.password.verification(this.password)) {
        return;
      }
      if (!this.$refs.username.verification(this.username)) {
        return;
      }
      if (this.username && this.password) {
        // 使用axios发送请求
        const res = await this.$axios({
          method: 'post',
          url: '/login',
          data: {
            username: this.username,
            password: this.password,
          },
        });
        const { statusCode, data, message } = res.data;
        if (statusCode == 200) {
          // 如果状态码为200,则登录成功并且跳转页面
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.user.id);
          // 如果是没有登录被拦截过来的用户则返回到之前的页面
          if (this.$route.params.back) {
            this.$router.back();
            this.$toast.success(message);
            return;
          }
          this.$router.push('/user');
          //显示提示信息
          this.$toast.success(message);
        }
        if (statusCode == 401) {
          this.$toast.fail(message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wzj-login {
  margin: 20px;
  .register {
    margin-top: 20px;
    text-align: right;
    font-size: 14px;
  }
}
</style>
