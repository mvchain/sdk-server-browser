<template>

  <el-upload
    :action="imgBase"
    :data="imgObj"
    v-loading="loading"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    list-type="picture">
    <img  v-if="imageUrl" :src="imageUrl"  @click="updateImg" class="avatar">
    <i  v-else class="el-icon-plus avatar-uploader-icon"  @click="updateImg"></i>
  </el-upload>
</template>
<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ossload',
    props: {
      limit: Number,
      type: String,
      payload: String,
      proObj: Object,
      imgName: String,
    },
    mounted() {
      if (this.imgName) {
        this.imageUrl = this.imgName;
      }
    },
    watch: {
      imgName: function(v) {
        this.imageUrl = v;
      }
    },
    data() {
      return {
        imgBase: window.urlData.ossObj.host,
        loading: false,
        imageUrl: '',
        ossObj: {},
        imgObj: {
          name: '',
          key: '',
          policy: '',
          OSSAccessKeyId: window.urlData.ossObj.accessid,
          success_action_status: '200',
          signature: ''
        }
      }
    },


    methods: {
      updateImg() {
        this.$store.dispatch('getOssObj').then((res) => {
          this.ossObj = res;
          this.imgObj.policy = res.policy;
          this.imgObj.signature = res.signature
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      random_string(len) {
        len = len || 32
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        const maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      },
      dateFormat(date, format) {
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }

        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (const k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
          }
        }
        return format
      },
      get_suffix(filename) {
        const pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos !== -1) {
          suffix = filename.substring(pos)
        }
        return suffix
      },
      calculate_object_name(filename) {
        const now = new Date()
        const nowStr = this.dateFormat(now, 'yyyyMMddhhmmss')
        const suffix = this.get_suffix(filename)
        return this.ossObj.dir + '/' + nowStr + this.random_string(10) + suffix
      },

      handleAvatarSuccess(res, file) {
        this.loading = false;
        this.imageUrl = this.imgBase + '/' + this.imgObj.key
        this.$emit('set-img-url', this.imageUrl)
      },
      beforeAvatarUpload(file) {
        let isJPG = false
        this.loading = true;
        isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        const isLt2M = file.size / 1024 / 1024 < this.limit
        this.imgObj.key = this.calculate_object_name(file.name)
        if (!isJPG) {
          this.$message.error(`只支持${this.payload}格式!`)
        }
        if (!isLt2M) {
          this.$message.error(`上传文件大小不能超过 ${this.limit}MB!`)
        }
        return isJPG && isLt2M
      },
      handleAvatarError(err) {
        this.loading = false;
        this.$message.error(err)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
