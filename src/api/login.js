import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function refreshToken(data) {
  return request({
    url: '/user/refresh',
    method: 'post'
  })
}
export function validateCode(data) {
  return request({
    url: '/user/sms?cellphone=' + data,
    method: 'get'
  })
}
export function order(data) {
  return request({
    url: '/business' + data,
    method: 'get'
  })
}
export function count(data) {
  return request({
    url: '/business/count' + data,
    method: 'get'
  })
}
export function developList(data) {
  return request({
    url: '/business/develop',
    method: 'get'
  })
}
export function setDevelop(data) {
  return request({
    url: '/business/develop',
    method: 'post',
    data
  })
}
