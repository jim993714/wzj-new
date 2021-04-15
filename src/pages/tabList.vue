<template>
  <div class="tabList">
    <wzj-head>栏目管理</wzj-head>
    <p>点击删除以下频道(至少保留3项)</p>
    <div class="content">
      <div
        class="item"
        v-for="item in Active"
        :key="item.id"
        @click="del(item.id, item.name)"
      >
        {{ item.name }}
      </div>
    </div>
    <p v-show="deActive.length > 0">点击添加以下频道</p>
    <div class="content">
      <div
        class="item"
        v-for="item in deActive"
        :key="item.id"
        v-show="deActive.length > 0"
        @click="add(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 点击删除的列表数据
      Active: [],
      // 点击添加的列表数据
      deActive: [],
    };
  },
  async created() {
    //发送请求前,先判断本地缓存中有没有数据,如果有则直接赋值,中断发送请求
    let Active = JSON.parse(localStorage.getItem('Active'));
    let deActive = JSON.parse(localStorage.getItem('deActive'));
    if (Active || deActive) {
      this.Active = Active;
      this.deActive = deActive;
      return;
    }
    // 进入页面先拿所有栏目的数据,然后渲染页面
    const res = await this.$axios.get('/category');
    const { statusCode, data } = res.data;
    if (statusCode == 200) {
      this.Active = data;
    }
    // console.log(data);
  },
  methods: {
    del(id, name) {
      // 最少保留3个栏目
      if (this.Active.length <= 3) return this.$toast('至少保留3项');
      // 点击后根据id找到对应数据并存入本地缓存中
      let idx = this.Active.findIndex((v) => {
        return v.id == id;
      });
      // 删除栏目
      this.Active.slice(idx, 1);
      // 添加栏目增加
      this.deActive.push(this.Active.splice(idx, 1)[0]);
      // console.log(this.deActive);
    },
    add(id) {
      console.log(id);
      let idx = this.Active.findIndex((v) => {
        return v.id == id;
      });
      // 删除栏目
      this.deActive.slice(idx, 1);
      // 添加栏目增加
      this.Active.push(this.deActive.splice(idx, 1)[0]);
      // console.log(this.Active);
    },
  },
  // 监听数据变化,如果栏目列表变化就存入本地缓存中
  watch: {
    Active: {
      deep: true,
      handler(value) {
        localStorage.setItem('Active', JSON.stringify(value));
        localStorage.setItem('deActive', JSON.stringify(this.deActive));
      },
    },
  },
};
</script>

<style lang="less" scoped>
.tabList {
  padding: 20pax;
  p {
    padding: 10px 20px;
    font-size: 14px;
    color: #999;
  }
  .content {
    overflow: hidden;
    padding: 0px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #ccc;
      border: 1px solid #999;
      padding: 0 10px;
      margin-right: 10px;
    }
  }
}
</style>
