const getters = {
  sidebar: state => state.app.sidebar,

  token: state => state.login.token,
  avatar: state => state.login.avatar,
  orderList: state => state.login.orderList,
  countList: state => state.login.countList,
  developData: state => state.login.developData,
}
export default getters
