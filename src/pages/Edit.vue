<template>
  <div class="edit">
    <wzj-head>编辑资料</wzj-head>
    <div class="portrait">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <nav-bar
      title="昵称"
      :content="info.nickname"
      @click="showNickname"
    ></nav-bar>
    <nav-bar
      title="密码"
      :content="info.password | password"
      @click="showPassword"
    ></nav-bar>
    <nav-bar
      title="性别"
      :content="info.gender == 1 ? '男' : '女'"
      @click="showGender"
    ></nav-bar>
    <!-- 修改昵称的弹出框 -->
    <van-dialog
      v-model="show1"
      title="修改用户昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" placeholder="输入用户昵称" />
    </van-dialog>
    <!-- 修改密码弹出框 -->
    <van-dialog
      v-model="show2"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field v-model="password" placeholder="输入新密码" />
    </van-dialog>
    <!-- 修改性别弹框 -->
    <van-dialog
      v-model="show3"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪图片的模态框 -->
    <div class="mask" v-show="showMask">
      <vue-cropper
        :img="img"
        autoCrop
        :autoCropWidth="150"
        :autoCropHeight="150"
        canMoveBox
        canMove
        :fixed="true"
        :original="true"
        :centerBox="true"
        ref="cropper"
      ></vue-cropper>
      <van-button type="primary" class="left" @click="confirm">确定</van-button>
      <van-button type="default" class="right" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
// 引入VueCropper
import { VueCropper } from 'vue-cropper';
export default {
  created() {
    this.render();
  },
  components: {
    VueCropper,
  },
  methods: {
    async render() {
      let id = localStorage.getItem('id');
      // 发送请求获取用户的信息
      const res = await this.$axios({
        method: 'get',
        url: `/user/${id}`,
      });
      const { data, statusCode } = res.data;
      if (statusCode == 200) {
        this.info = data;
      }
    },
    // 显示昵称弹框
    showNickname() {
      this.show1 = true;
      this.nickname = this.info.nickname;
    },
    // 显示密码弹窗
    showPassword() {
      this.show2 = true;
      this.password = this.info.password;
    },
    // 显示性别弹窗
    showGender() {
      this.show3 = true;
      this.gender = this.info.gender;
    },
    //点击确定修改昵称
    async editNickname() {
      let id = localStorage.getItem('id');
      // 发送请求
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${id}`,
        data: {
          nickname: this.nickname,
        },
      });
      const { message, statusCode } = res.data;
      if (statusCode == 200) {
        this.render();
        this.$toast(message);
      }
    },
    // 点击确定修改密码
    async editPassword() {
      let id = localStorage.getItem('id');
      // 发送请求
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${id}`,
        data: {
          password: this.password,
        },
      });
      const { message, statusCode } = res.data;
      if (statusCode == 200) {
        this.render();
        this.$toast(message);
      }
    },

    // 点击修改性别
    async editGender() {
      let id = localStorage.getItem('id');
      // 发送请求
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${id}`,
        data: {
          gender: this.gender,
        },
      });
      const { message, statusCode } = res.data;
      if (statusCode) {
        this.render();
        this.$toast(message);
      }
    },
    // 上传头像
    afterRead(file) {
      // 上传文件先不发送请求 先弹出裁剪框
      this.showMask = true;
      this.img = file.content;
    },
    confirm() {
      // 通过$refs获取截取图片的文件 并发送请求
      this.$refs.cropper.getCropBlob(async (date) => {
        // 发送请求
        let fd = new FormData();
        fd.append('file', date);
        const res = await this.$axios({
          url: '/upload',
          method: 'post',
          data: fd,
        });
        const { data, statusCode } = res.data;
        let id = localStorage.getItem('id');
        if (statusCode == 200) {
          const res = await this.$axios({
            url: `/user_update/${id}`,
            method: 'post',
            data: {
              head_img: data.url,
            },
          });
          const { statuCode, data: date } = res.data;
          // console.log(date, statusCode);
          if (statusCode == 200) {
            this.info.head_img = date.head_img;
            this.showMask = false;
          }
        }
      });
    },
    cancel() {
      this.showMask = false;
    },
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      nickname: '',
      password: '',
      gender: 1,
      info: '',
      // 图片的地址
      img: '',
      showMask: false,
    };
  },
  //  注册一个过滤器 过滤密码 解决密码第一次刷新会报错的问题
  filters: {
    password(input) {
      if (!input) {
        return '';
      }
      return input.replace(/./g, '*');
    },
  },
};
</script>

<style lang="less" scoped>
.edit {
  .portrait {
    position: relative;
    img {
      width: 70px;
      height: 70px;
      border: 1px solid #ccc;
      margin: 30px auto;
      display: block;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 50%;
      top: 0;
      transform: translate(-50%);
      opacity: 0;
    }
  }

  .van-dialog {
    padding: 10px;
    .van-field {
      margin: 10px 0;
      border: 1px solid #ccc;
      margin-top: 10px;
      border-radius: 5px;
    }
  }
  .mask {
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .left,
    .right {
      position: absolute;
      bottom: 0;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
}
</style>
