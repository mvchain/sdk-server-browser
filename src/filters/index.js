export function adminTypeFilter(v) {
  switch (v) {
    case 0:
      return '主管理员'
    case 1:
      return '子管理员'
    default:
      return '子管理员'
  }
}
export function orderStatusFliter(v) {

  switch (v) {
    case 0:
      return '等待结算';
    case 1:
      return '成功众筹';
    case 9:
      return '未成功众筹';
    default:
      return '未成功众筹';
  }
}
export function pendingStatusFilter(v) {

  switch (v) {
    case 0:
      return '挂单中';
    case 1:
      return '交易完成';
    case 4:
      return '已撤销';
    default:
      return '已撤销'
  }
}
export function projectStatusFliter(v) {

  switch (v) {
    case 0:
      return '即将开始'
    case 1:
      return '进行中'
    case 2:
      return '已结束'
    case 9:
      return '取消'
    default:
      return '取消'
  }
}
export function statusFliter(v) {
  switch (v) {
    case 1:
      return '待审核'
    case 2:
      return '待签名'
    case 3:
      return '拒绝'
    case 4:
      return '正在提币'
    case 5:
      return '提币成功'
    case 6:
      return '失败'
    default:
      return '失败！'
  }
}
