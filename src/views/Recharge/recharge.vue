<template>
  <div class="recharge">
    <el-row>
      <el-col :span="18">
        <el-select @change="statusHandler" v-model="orderStatus" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="rechargeTime"
          type="daterange"
          align="right"
          @change="timeHandler"
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
      <el-col :span="6">
        <el-input clearable placeholder="搜索订单号、用户id、Topay注册手机" v-model="searchText" class="input-with-select">
          <el-button @click="searchHandler" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <div style="margin-top:20px;">
      <el-table
        :data="orderList.list"
        border
        style="width: 100%">
        <el-table-column
          prop="orderNumber"
          label="商户充值订单号">
        </el-table-column>
        <el-table-column
          prop="selfOrderNumber"
          label="划账订单号">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="下单时间">
          <template slot-scope="scope" >
            {{new Date(scope.row.createdAt).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column
          label="到账时间">
          <template slot-scope="scope" >
            {{new Date(scope.row.payAt).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label="Topay注册手机号">
        </el-table-column>
        <el-table-column
          prop="buyUserId"
          label="用户ID">
        </el-table-column>
        <el-table-column
          label="法币金额">
          <template slot-scope="scope" >
            {{scope.row.amount}}CNY
          </template>
        </el-table-column>
        <el-table-column
          label="数字货币金额">
          <template slot-scope="scope" >
            {{scope.row.tokenValue}}{{scope.row.tokenName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="statusStr"
          label="状态">
        </el-table-column>

      </el-table>
      <div style="margin-top:30px; text-align:center;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="orderList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isPhone } from '@/utils/validate'
  export default {
    name: 'recharge',
    props: {
      manage: Object
    },
    data() {
      return {
        orderStatus: '',
        statusList: [
          {
            id: '',
            title: '全部'
          },
          {
            id: 0,
            title: '等待付款'
          },
          {
            id: 1,
            title: '已支付'
          },
          {
            id: 2,
            title: '已完成'
          },
          {
            id: 4,
            title: '已取消'
          },
          {
            id: 9,
            title: '失败'
          }
        ],
        rechargeTime: '',
        orderNumber: '',
        cellphone: '',
        exportFlag: false,
        searchText: '',
        userId: '',
        pageNum: 1
      }
    },
    computed: {
      ...mapGetters({
        orderList: 'orderList'
      })
    },
    mounted() {
      this.orderData()
    },
    methods: {
      orderData() {
        this.$store.dispatch('getOrderList', `?cellphone=${this.cellphone}
        &createdStartAt=${this.rechargeTime ? this.rechargeTime[0] : 0}
        &createdStopAt=${this.rechargeTime ? this.rechargeTime[1] : new Date().getTime()}
        &orderBy=created_at desc
        &orderNumber=${this.orderNumber}
        &pageNum=${this.pageNum}
        &pageSize=20
        &status=${this.orderStatus}
        &userId=${this.userId}`)
      },
      exportTable() {},
      handleCurrentChange(v) {
        this.pageNum = v
        this.orderData()
      },
      statusHandler() {
        this.pageNum = 1;
        this.orderData();
      },
      timeHandler() {},
      searchHandler() {
        const s = this.searchText.trim()
        if (!s) {
          [this.cellphone, this.orderNumber, this.userId] = ['', '', '']
        } else if (isPhone(this.searchText)) {
          this.cellphone = s
        } else if (isNaN(Number(s))) {
          this.orderNumber = s
        } else {
          this.userId = s
        }
        this.orderData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .recharge{
    padding:20px;
  }
</style>
