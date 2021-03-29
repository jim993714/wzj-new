<template>
  <div class="register">
    <wzj-head>注册</wzj-head>
    <wzj-log></wzj-log>
    <wzj-input
      type="text"
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不正确,请输入5-11位手机号码"
      ref="username"
    ></wzj-input>
    <wzj-input
      type="text"
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4E00-\uFA29]{2,7}$/"
      message="请输入2到7位中文"
      ref="nickname"
    ></wzj-input>
    <wzj-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\w{3,8}$/"
      message="密码格式不正确"
      ref="password"
    >
    </wzj-input>
    <wzj-btn @click="register">注册</wzj-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
    };
  },
  methods: {
    async register() {
      //发送注册请求之前,先进行校验,校验通过才能发送请求
      if (!this.$refs.username.verification(this.username)) {
        return;
      }
      if (!this.$refs.nickname.verification(this.nickname)) {
        return;
      }
      if (!this.$refs.password.verification(this.password)) {
        return;
      }
      if (this.password && this.username && this.nickname) {
        const res = await this.$axios({
          url: '/register',
          method: 'post',
          data: {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          },
        });
        const { statusCode } = res.data;
        if (statusCode == 200) {
          this.$router.push({
            name: 'login',
            params: {
              username: this.username,
              password: this.password,
            },
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  padding: 20px;
}
</style>
