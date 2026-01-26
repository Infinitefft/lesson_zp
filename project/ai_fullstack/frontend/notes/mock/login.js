import jwt from "jsonwebtoken";  // 签发token，验证token
import { kMaxLength } from "node:buffer";

const secret = 'niubibiniuniuniubi666!';   // 安全


export default [
  {
    // restful 一切皆资源
    url: '/api/auth/login',
    method: 'post',
    timeout: 2000,  // 延迟时间
    response: (req, res) => {
      let { name, password } = req.body;
      name = name.trim();
      password = password.trim();
      // console.log(name, password, '//////');
      if (name === "" || password === "") {
        return {
          code: 400,  // Bad Request
          msg: '用户名或密码不能为空',
        }
      }
      if (name !== 'admin' || password != '123456') {
        return {
          code: 401,  // unauthorized
          msg: '用户名或密码错误',
        }
      }

      const token = jwt.sign({
        user: { // json 对象
          id: 1,
          name: "admin",
          avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/58d20180523f5db311053338fc3fc29c~140x140.awebp"
        }
      // 加盐
      }, secret, {
        expiresIn: 86400*7,  // token 有效时间为7天
      })

      console.log(token, "////////")
      return {
        user: {
          id: 1,
          name: "admin",
          avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/58d20180523f5db311053338fc3fc29c~140x140.awebp"
        },
        token,
      }
    }
  },
  {
    url: '/api/auth/check',
    modthod: 'GET',
    response: (req, res) => {
      const token = req.headers['authorization'].split(" ")[1];
      // console.log(token);
      try {
        const decode = jwt.decode(token, secret);
        // console.log(decode);
        return {
          code: 200,
          user: decode.user
        }
      } catch(err) {
        return {
          code: 400,
          message: "invalid token"
        }
      }
    }
  }
]