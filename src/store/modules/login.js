import {login, refreshToken, validateCode, order, count, developList, setDevelop} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    avatar: '',
    orderList: {},
    countList: [],
    developData: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ORDER_LIST: (state, token) => {
      state.orderList = token
    },
    SET_COUNT_LIST: (state, token) => {
      state.countList = token
    },
    SET_DEVELOP_DATA: (state, token) => {
      state.developData = token
    }
  },

  actions: {
    // 登录
    Login({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          state.avatar = payload.cellphone;
          res.data.cellphone = payload.cellphone;
          window.localStorage.setItem('user', JSON.stringify(res.data))
          setToken(res.data.token)
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        window.localStorage.clear()
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        window.sessionStorage.clear()
        removeToken()
        resolve()
      })
    },
    getReferToken: () => {
      const rToken = JSON.parse(window.localStorage.getItem('user')).refreshToken
      setToken(rToken)
      return new Promise((resolve, reject) => {
        refreshToken().then(res => {
          setToken(res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getValidate({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        validateCode(payload).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOrderList({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        order(payload).then(res => {
          commit('SET_ORDER_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCountList({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        count(payload).then(res => {
          commit('SET_COUNT_LIST', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDevelopData({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        developList().then(res => {
          commit('SET_DEVELOP_DATA', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    setDevelopData({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        setDevelop(payload).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
