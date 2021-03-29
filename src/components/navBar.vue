<template>
  <div class="navbar" @click="edit">
    <div class="left">
      <span>{{ title }}</span>
    </div>
    <div class="center">
      <span>{{ content }}</span>
    </div>
    <div class="right"><span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: String,
  },
  methods: {
    edit() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
.navbar {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px #ccc solid;
  margin: 20px;
  color: #666;
  font-size: 14px;
  display: flex;
  .left {
    color: black;
    width: 60px;
  }
  .right {
    width: 10px;
  }
  .center {
    flex: 1;
    text-align: right;
    font-size: 12px;
  }
}
</style>
