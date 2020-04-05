import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    // baseURL:"http://123.207.32.32:8000/api/vip",
    // baseURL:"http://106.54.54.237:8000/api/v1",
    baseURL:'http://123.207.32.32:8000/api/wh',
    timeout: 10000



  })

  // 发送真正的网络请求
  return instance(config)
}