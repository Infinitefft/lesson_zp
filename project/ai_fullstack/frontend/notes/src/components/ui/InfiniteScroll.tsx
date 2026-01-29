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
  return (
    <>
      {children}
    </>
  )
}

export default InfiniteScroll