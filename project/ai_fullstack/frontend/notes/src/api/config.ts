import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';
// 接口地址都以/api开始
// axios.defaults.baseURL = 'http://localhost:5173/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})


// interceptors: 拦截器集合 axios 的流程是：准备请求 → 发请求 → 收响应
// request 就是：“准备请求”这个阶段
// use：注册 / 安装一个拦截器
instance.interceptors.request.use(config => {
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
// 成功的响应
// 失败的响应
// 标记是否正在刷新token
// refresh token + redo requests
let isRefreshing = false;
// 请求队列，refresh 中，在并发的请求再去发送没有意义
// 保存下来，存到一个队列中，无缝地将之前的所有失败的请求，再请求，带上新的token 就会成功
let requestQueue: any[] = [];

instance.interceptors.response.use(res => {
  // console.log('////[][][]');
  // console.log("|||||||", res);
  // if (res.status != 200) {
  //   console.log("出错了");
  //   return;
  // }
  return res.data;
}, async (err) => {
  // console.log(err, "9090909090()()()()()()");
  // 请求对象的config
  const { config, response } = err;
  // console.log(config, response, "[][][][][]{}{}{}{}");
  // _retry 刻意标记 是否是重新的请求，避免retry 死循环
  if (response?.status === 401 && !config._retry) {
    // 如果在刷新中，把后续请求放到队列中
    if (isRefreshing) {
      // 异步，未来token refresh 后，再solve
      return new Promise((resolve) => {
        requestQueue.push((token: string) => {
          config.headers.Authorization = `Bearer ${token}`
          resolve(instance(config));
        });
      })
    }
    config.retry = true;  // retry 开关
    isRefreshing = true;

    try {
      // refresh
      const { refreshToken } = useUserStore.getState();
      if (refreshToken) {
        // 无感刷新 token
        const { access_token, refresh_token } = await instance.post('/auth/refresh', {
          refresh_token: refreshToken
        })
        // console.log(res, "???///??///??///??///??///");
        useUserStore.setState({
          accessToken: access_token,
          refreshToken: refresh_token,
          isLogin: true,
        });

        requestQueue.forEach((callback) => callback(access_token));
        requestQueue = [];
        // 当前请求
        config.headers.Authorization = `Bearer ${access_token}`
        return instance(config);
      }
    } catch (err) {
      useUserStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(err);
  // 刷新token
})

export default instance;