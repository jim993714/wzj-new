<template>
  <div class="wzj-head">
    <span class="iconfont iconjiantou2 left" @click="$router.go(-1)"></span>
    <span class="center"><slot></slot></span>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wzj-head {
  padding: 5px 10px;
  line-height: 30px;
  font-size: 16px;
  display: flex;
  border-bottom: 1px solid #ccc;
  .left,
  .right {
    width: 30px;
    height: 30px;
  }
  .center {
    height: 30px;
    flex: 1;
    text-align: center;
  }
}
</style>
