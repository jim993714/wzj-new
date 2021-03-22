<template>
  <div class="user">
    <wzj-head>个人中心</wzj-head>
    <div class="user-top">
      <div class="left">
        <img src="../image/WechatIMG7.png" alt="" />
      </div>
      <div class="center">
        <span class="iconfont iconxingbienan"></span>火星网友
        <div>
          <span>2019-10-10</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <nav-bar title="我的关注" content="关注的用户"></nav-bar>
    <nav-bar title="我的跟帖" content="跟帖/回复"></nav-bar>
    <nav-bar title="我的收藏" content="文章/视频"></nav-bar>
    <nav-bar title="设置"></nav-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.user {
  .user-top {
    padding: 0 20px;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-bottom: 2px solid #ccc;
    .left {
      width: 70px;
      img {
        border-radius: 50%;
        width: 70px;
      }
    }
    .right {
      width: 30px;
      text-align: right;
    }
    .center {
      flex: 1;
      margin-left: 10px;
      .iconfont {
        color: skyblue;
      }
    }
  }
}
</style>
