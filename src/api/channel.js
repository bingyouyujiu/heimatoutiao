import request from '@/utils/request.js'

// 获取全部频道
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

// 添加频道
export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户指定频道
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/channels/${channelId}`

  })
}
