<template>
  <div class="wzj-btn">
    <div @click="login"><slot></slot></div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // 触发父组件身上的登录事件,发送请求
      this.$emit('login');
    },
  },
};
</script>

<style lang="less" scoped>
.wzj-btn {
  height: 48px;
  font-size: 18px;
  width: 100%;
  text-align: center;
  margin-top: 60px;
  background-color: red;
  color: #fff;
  line-height: 48px;
  border-radius: 48px;
}
</style>
