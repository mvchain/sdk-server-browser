<template>
  <div class="develop">
    <div>
      <el-input  v-model="developData.callbackUrl">
        <template slot="prepend">回调地址</template>
        <el-button slot="append" icon="el-icon-check" @click="subUrl"></el-button>
      </el-input>
    </div>
    <div>
      <el-input readonly v-model="developData.appKey">
        <template slot="prepend">appKey</template>
      </el-input>
    </div>
    <div>
      <el-input readonly v-model="developData.appSecret">
        <template slot="prepend">appKey</template>
      </el-input>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'develop',
    data() {
      return {
        callbackUrl: '',
        appKey: '',
        appSecret: ''
      }
    },
    computed: {
      ...mapGetters({
        developData: 'developData'
      })
    },
    mounted() {
      this.getDevelopData()
    },
    methods: {
      getDevelopData() {
        this.$store.dispatch('getDevelopData')
      },
      subUrl() {
        this.$store.dispatch('setDevelopData', { callbackUrl: this.developData.callbackUrl}).then(() => {
          this.$message.success('设置成功')
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .develop{
    padding: 20px;
    width:800px;
    & > div{
      margin-bottom:20px;
    }
  }
</style>
