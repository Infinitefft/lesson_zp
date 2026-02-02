import {
  useState,
  useEffect,
} from 'react';

const KeepAlive = ({
  activeId,
  children,
}) => {
  const [cache, setCache] = useState({});  // 缓存组件的
  // console.log(children, "--------");
  useEffect(() => {
    // activeId updata 切换显示
    // children updata 保存
    if (!cache[activeId]) {  // activeId key
      setCache((pre) => ({
        ...pre,
        [activeId]: children
      }))
    }
    // console.log(cache, "????????");
  }, [activeId, children, cache])
  return (
    <>
      {
        // Object.entries 对象变成数组
        // [key, value] 又方便使用
        Object.entries(cache).map(([id, components]) => (
          <div key={id} style={{display: id === activeId ? 'block' : 'none'}}
          >
            {components}
          </div>
        ))
      }
    </>
  )
}

export default KeepAlive