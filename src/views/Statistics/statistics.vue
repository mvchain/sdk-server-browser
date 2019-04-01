<template>
  <div class="statistics">
    <el-row>
      <el-col :span="24">
        <el-date-picker
          v-model="rechargeTime"
          type="daterange"
          align="right"
          @change="countData"
          :clearable="true"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button :loading="exportFlag" @click="exportTable">导出表格</el-button>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="countList"
        border
        style="width: 100%">

        <el-table-column
          prop="createdAt"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="txCount"
          label="充值订单数">
        </el-table-column>
        <el-table-column
          prop="cny"
          label="累计法币金额">
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="数字货币金额">
          <template slot-scope="scope">
            {{scope.row.tokenValue}}{{scope.row.tokenName}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'statistics',
    data() {
      return {
        rechargeTime: '',
        exportFlag: false,
        pageNum: 1
      }
    },
    computed: {
      ...mapGetters({
        countList: 'countList'
      })
    },
    mounted() {
      this.countData()
    },
    methods: {
      countData() {
        this.$store.dispatch('getCountList', `?startedAt=${this.rechargeTime ? this.rechargeTime[0] : 0}
        &stopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}`)
      },
      exportTable() {},
      handleCurrentChange(v) {
        this.pageNum = v
        this.countData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .statistics{
    padding:20px;
  }
</style>
