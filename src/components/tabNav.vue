<template>
  <div class="tabnav">
    <div class="info" v-for="item in data" :key="item.id">
      <!-- 如果是视频展示下面结构 -->
      <div class="info3" v-if="item.type == 2">
        <div class="top">{{ item.title }}</div>
        <div class="center">
          <div class="icon">
            <span class="iconfont iconshipin "></span>
          </div>
          <img
            :src="
              item.cover[0].url.startsWith('http')
                ? item.cover[0].url
                : $axios.defaults.baseURL + item.cover[0].url
            "
            alt=""
          />
        </div>
        <div class="bottom">
          <div class="text">
            <span>{{ item.user.nickname }}</span>
            <span>{{ item.comment_length }}跟帖</span>
          </div>
        </div>
      </div>
      <!-- 图片小于3张展示下面结构 -->
      <div class="info1" v-else-if="item.cover.length < 3">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="text">
            <span>{{ item.user.nickname }}</span>
            <span>{{ item.comment_length }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img
            :src="
              item.cover[0].url.startsWith('http')
                ? item.cover[0].url
                : $axios.defaults.baseURL + item.cover[0].url
            "
            alt=""
          />
        </div>
      </div>
      <!-- 图片3张以上的展示下面的结构 -->
      <div class="info2" v-else>
        <div class="top">{{ item.title }}</div>
        <div class="center">
          <img
            :src="
              item.cover[0].url.startsWith('http')
                ? item.cover[0].url
                : $axios.defaults.baseURL + item.cover[0].url
            "
            alt=""
          />
          <img
            :src="
              item.cover[1].url.startsWith('http')
                ? item.cover[1].url
                : $axios.defaults.baseURL + item.cover[1].url
            "
            alt=""
          />
          <img
            :src="
              item.cover[2].url.startsWith('http')
                ? item.cover[2].url
                : $axios.defaults.baseURL + item.cover[2].url
            "
            alt=""
          />
        </div>
        <div class="bottom">
          <div class="text">
            <span>{{ item.user.nickname }}</span>
            <span>{{ item.comment_length }}跟帖</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>

<style lang="less" scoped>
.info {
  border-bottom: 1px solid #ccc;
  .info1 {
    margin-top: 10px;
    display: flex;
    font-size: 14px;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;
      flex: 1;
      .text {
        margin-bottom: 10px;
        span {
          margin-right: 5px;
        }
      }
    }
    .right {
      padding-right: 10px;
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  .info2 {
    margin-top: 10px;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    padding: 0 10px;
    .top {
      font-size: 14px;
    }
    .center {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      img {
        width: 32%;
        height: 75px;
        object-fit: cover;
      }
    }
    .bottom {
      margin-bottom: 10px;
      .text {
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .info3 {
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    .top {
      font-size: 14px;
    }
    .center {
      margin: 10px 0;
      display: flex;
      position: relative;
      img {
        width: 100%;
        height: 170px;
        object-fit: cover;
      }
      .icon {
        height: 55px;
        width: 55px;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .iconshipin {
          font-size: 46px;
          text-align: center;
          color: #fff;
        }
      }
    }
    .bottom {
      margin-bottom: 10px;
      .text {
        span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
