import Header from '@/components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import SlideShow, {type SlideData} from '@/components/SlideShow';
import useHomeStore from '@/store/home'
import { useEffect } from 'react';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import Loading from '@/components/Loading';
import PostItem from '@/components/PostItem';



const Home = () => {
  const { 
    banners,
    posts,
    hasMore, 
    loadMore, 
    loading,
  } = useHomeStore();


  useEffect(() => {
    loadMore();
  }, []);
  
  return (
    <>
      <Header title="首页" showBackBtn={true}></Header>
      <div className="p-4 space-y-4">
        <SlideShow slides={banners}/>
        <Card>
          <CardHeader>
            <CardTitle>
              欢迎来到React Mobile
            </CardTitle>
          </CardHeader> 
          <CardContent>
            <p className="text-muted-foreground">
              这是内容区域
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25, 26].map((i, index) => (
              <div key={index} className="h-32 bg-white rounded-lg
                shadow-sm flex items-center justify-center border
              ">
                Item {i}
              </div>
            ))
          }
        </div>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">文章列表</h1>
          <InfiniteScroll 
            hasMore={hasMore}
            isLoading={loading}
            onLoadMore={loadMore}
          >
            <ul>
              {
                posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))
              }
            </ul>
            {/* 业务组件 */}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

export default Home;