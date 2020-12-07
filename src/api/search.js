import request from '../utils/request'

// 获取搜索建议列表
export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: 'v1_0/suggestion',
    params: { q }
  })
}

// 获取搜索结果
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: 'v1_0/search',
    params: params
  })
}

// 获取搜索历史
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: 'v1_0/search/histories'
  })
}
