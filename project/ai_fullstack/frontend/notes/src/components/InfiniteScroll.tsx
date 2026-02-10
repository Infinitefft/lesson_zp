import { useRef, useEffect } from 'react'

// loadmore 通用组件
interface InfiniteScrollProps {
  hasMore: boolean;  // 是否所有数据都加载了 分页
  isLoading?: boolean;  // 滚动到底部加载更多 避免重复触发
  onLoadMore: () => void;  // 更多加载的一个抽象   /api/post?page=2&limit=10
  children: React.ReactNode;  // InfiniteScroll 通用的滚动功能，滚动过的具体内容 接受自定义
}


const InfiniteScroll:React.FC<InfiniteScrollProps> = ({
  hasMore,
  onLoadMore,
  isLoading = false,
  children,
}) => {
  // HTMLDivElement React 前端全局提供
  // react 不建议直接访问 dom ，使用useRef
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasMore || isLoading) return;  // 没有数量或还在加载中
    // 浏览器内部 没有性能问题
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {  // 哨兵进入视窗  viewport
        onLoadMore();
      }
    }, {
      threshold: 0,  // 哨兵元素只要有一个像素进入视窗时触发
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    // 卸载（路由切换）
    // 更新时
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    }
    // dom ，组件挂载后 sentinelRef.current
  }, [onLoadMore, hasMore, isLoading])

  return (
    <>
      {children}
      {/* Intersection Observer 哨兵元素 */}
      <div ref={sentinelRef} className="h-4" />
      {
        isLoading && (
          isLoading && (
            <div className="text-center py-4 text-sm text-muted-forgound">
              加载中...
            </div>
          )
        )
      }
    </>
  )
}

export default InfiniteScroll