export const login = (data) => {
  return axios.post('/auth/login', data);
}


export const gtUserInfo = () => {
  return requestAnimationFrame.get('/user/info');
}


export const register = (data) => {
  return axios.post('/auth/register', {
    usename: data.username,
    password: data.password,
    email: data.email,
  })
}