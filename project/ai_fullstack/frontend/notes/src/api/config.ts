import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';
// 接口地址都以/api开始
// axios.defaults.baseURL = 'http://localhost:5173/api'
axios.defaults.baseURL = 'http://localhost:3000/api'


// interceptors: 拦截器集合 axios 的流程是：准备请求 → 发请求 → 收响应
// request 就是：“准备请求”这个阶段
// use：注册 / 安装一个拦截器
axios.interceptors.request.use(config => {
  // console.log("|||||||", config);
  const token = useUserStore.getState().accessToken;
  // console.log(token, "<><><><>")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})
// axios.defaults.baseURL = 'http://douyin:5173/api'


// axios api 请求大管家  关于请求的一切都会给我们
// data 只是其中一项
axios.interceptors.response.use(res => {
  // console.log('////[][][]');
  // console.log("|||||||", res);
  if (res.status != 200) {
    console.log("出错了");
    return;
  }
  return res.data;
})

export default axios;