<template>
  <div class="login-container">
    <el-form @keyup.enter.native="handleLogin('loginForm')" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">钱包服务器后台</h3>
      <el-form-item prop="cellphone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="cellphone" type="text" v-model="loginForm.cellphone" autoComplete="on" placeholder="cellphone"/>
      </el-form-item>

      <el-form-item prop="validCode" >
        <el-col :span="12">
          <el-input placeholder="输入验证码" v-model="loginForm.validCode" type="text"></el-input>
        </el-col>
        <el-col :span="12" style="text-align: right;height:47px;">
          <el-button class="login-code"  @click="countDown">{{validateTxt}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" v-loading="loading" @click="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    mounted() {
    },
    data() {
      return {
        loginForm: {
          cellphone: '',
          validCode: ''
        },
        canClick: true,
        totalTime: 30,
        validateTxt: '发送验证码',
        loginRules: {
          cellphone: [{ required: true, trigger: 'blur', message: '请输入用户名'  }],
          validCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
        },
        loading: false
      }
    },
    methods: {

      countDown() {
        if (!this.canClick) return // 改动的是这两行代码
        this.getValidateCode()
        this.canClick = false
        this.validateTxt = this.totalTime + 's后重新发送'
        const clock = window.setInterval(() => {
          this.totalTime--
          this.validateTxt = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.validateTxt = '重新发送验证码'
            this.totalTime = 10
            this.canClick = true
          }
        }, 1000)
      },
      getValidateCode() {
        this.$store.dispatch('getValidate', this.loginForm.cellphone).then((res) => {
          this.$message.success('发送成功')
        }).catch()
      },
      handleLogin() {
        this.$store.dispatch('Login', {cellphone: this.loginForm.cellphone, validCode: this.loginForm.validCode}).then((res) => {
          this.$router.push('/')
        }).catch((err) => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .verification-s {
      text-align: center;
      cursor: pointer;
      border-radius: 0 3px 3px 0;
      & img {
        position: relative;
        top: 8px;
      }
    }
    .login-code{
      height:47px;
    }
  }
</style>
