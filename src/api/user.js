import request from '../utils/request'
import Vue from 'vue'

// import store from '@/store'

export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data: data
  })
}

export function sendSms (data) {
  const p = request({
    method: 'get',
    url: '/v1_0/sms/codes/' + data
  })
  p.catch(error => {
    if (error.response.status === 429) {
      Vue.prototype.$toast('验证码获取频繁，请稍后再试')
    } else {
      Vue.prototype.$toast('验证码获取失败')
    }
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'

  })
}

// 关注用户
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 获取用户个人信息
export const getUserProfile = (target) => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 更新用户头像资料
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
