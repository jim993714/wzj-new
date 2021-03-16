<template>
  <div class="wzj-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{ success: status == 'success', error: status == 'error' }"
      @input="handler"
    />
    <div class="tips" v-show="isShow">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      require: true,
    },
    message: String,
    rule: {
      type: RegExp,
    },
  },
  data() {
    return {
      status: '',
      isShow: '',
    };
  },
  methods: {
    handler(e) {
      // 拿到DOM的input的value,将值传给父组件
      let value = e.target.value;
      this.$emit('input', value);
      // 当用户进行输入的时候验证正则是否为true, 如果是true则边框线为绿色,否则为红色,并且显示tips提示用户输入有误
      if (this.rule.test(value)) {
        this.status = 'success';
        this.isShow = false;
      } else {
        this.status = 'error';
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wzj-input {
  margin-top: 20px;
  input {
    height: 50px;
    width: 100%;
    font-size: 16px;
    color: #999;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    &.success {
      border-bottom: green 1px solid;
    }
    &.error {
      border-bottom: red 1px solid;
    }
  }
  .tips {
    color: red;
    font-size: 12px;
  }
}
</style>
