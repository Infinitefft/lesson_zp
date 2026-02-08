// 封装git diff 得到 llm 给我们的规范commit message
import {
  useState,
  useEffect,
} from 'react'
import { chat } from '../api/index.js'
// 自定义hooks：use开头，可以封装响应式业务，副作用等，从组件里剥离
// 组件单一的 UI

export const useGitDiff = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      // if (!diff) return;
      setLoading(true);
      const { data } = await chat('你好');
      setContent(data.reply);
      setLoading(false);
    })()
  }, [])

  return {
    loading,  // 加载中
    content,  // commit message
  }
}