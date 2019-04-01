<template>
  <el-upload
    class="upload-demo"
    :action="action"
    :headers="uploadHead"
    :on-success="successFun"
    :on-error="errorFun"
    :show-file-list="false"
    multiple
    :limit="3"
  >
    <el-button>{{labelTxt}}</el-button>
  </el-upload>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    name: "import-component",
    props: {
      action: String,
      labelTxt: String
    },
    data() {
      return {
        durationTime: 3,
        uploadHead: {
          Authorization: getToken()
        },
      }
    },
    methods: {
      successFun(s) {
        if (s.code !== 200) {
          this.$message.error(`导入失败${s.message}`)
        } else {
          window.setInterval(() => {
            this.durationTime--
            if (this.durationTime === -1) {
              this.$router.go(0)
            }
          }, 1000)
          this.$message.success({
            message: '上传成功,3秒后刷新页面',
            duration: 3000
          })
        }
      },
      errorFun(err) {
        this.$message.error(err.message)
      },
    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .upload-demo{
    display: inline-block;
    margin-right:20px;
  }
</style>
