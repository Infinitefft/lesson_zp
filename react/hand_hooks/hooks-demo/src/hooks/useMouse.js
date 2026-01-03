import {
  useState,
  useEffect,
} from 'react';
// 封装响应式 mouse 业务
// UI 组件更简单 HTML + CSS ，好维护
// 可以复用，和组件一样，是前端团队的核心资产
export const useMouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const update = (e) => {
      console.log('啦啦啦啦啦');
      setX(e.pageX);
      setY(e.pageY);
    }
    window.addEventListener('mousemove', update);
    console.log('||||||');
    return () => {
      console.log('||| 清除')
      window.removeEventListener('mousemove', update);
    }
  }, [])

  // 把要向外部暴露的状态和方法返回
  return {x, y};
}