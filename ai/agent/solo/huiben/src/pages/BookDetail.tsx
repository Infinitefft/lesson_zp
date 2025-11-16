import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, Star, Clock, Users, Share2, ShoppingCart, 
  ChevronLeft, ChevronRight, BookOpen, Award, MessageCircle 
} from 'lucide-react'
import Header from '@/components/Header'
import { useStore } from '@/store'
import { toast } from 'sonner'

// 模拟绘本详情数据
const bookData = {
  id: '1',
  title: '小熊宝宝绘本系列',
  author: '佐佐木洋子',
  publisher: '连环画出版社',
  cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱小熊宝宝角色，温馨绘本风格，柔和色彩，儿童插画&image_size=portrait_4_3',
  images: [
    'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝吃饭场景，温馨餐桌，儿童绘本风格&image_size=landscape_4_3',
    'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝睡觉场景，温馨卧室，月光洒进来，儿童绘本风格&image_size=landscape_4_3',
    'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝洗澡场景，浴缸泡泡，温馨浴室，儿童绘本风格&image_size=landscape_4_3'
  ],
  ageRange: '0-3岁',
  rating: 4.8,
  reviewCount: 1234,
  price: 35.8,
  originalPrice: 48.0,
  description: '这是一套非常经典的幼儿生活启蒙绘本，通过小熊宝宝的日常生活故事，帮助孩子养成良好的生活习惯。每一本都围绕一个生活主题展开，内容简单易懂，画面温馨可爱。',
  features: [
    '培养良好生活习惯',
    '简单易懂的故事情节',
    '温馨可爱的插画风格',
    '适合亲子共读'
  ],
  specifications: {
    'ISBN': '978-7-5056-1234-5',
    '页数': '24页',
    '开本': '24开',
    '装帧': '平装',
    '语言': '中文',
    '出版时间': '2023年6月'
  },
  tags: ['情绪管理', '生活习惯', '亲子阅读', '启蒙教育'],
  isFavorite: false,
  isNew: true,
  inStock: true
}

// 模拟评论数据
const reviews = [
  {
    id: '1',
    userName: '张妈妈',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨妈妈头像，柔和风格&image_size=square',
    rating: 5,
    content: '宝宝很喜欢这套绘本，每天都要读好几遍。画面很可爱，故事简单易懂，对培养宝宝的生活习惯很有帮助。',
    date: '2024-01-15',
    helpful: 23,
    childAge: '2岁'
  },
  {
    id: '2',
    userName: '李爸爸',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨爸爸头像，柔和风格&image_size=square',
    rating: 4,
    content: '质量很好，印刷清晰，纸张厚实。内容很适合2-3岁的宝宝，通过小熊的故事教会孩子很多生活技能。',
    date: '2024-01-10',
    helpful: 15,
    childAge: '3岁'
  },
  {
    id: '3',
    userName: '王奶奶',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨奶奶头像，柔和风格&image_size=square',
    rating: 5,
    content: '给孙子买的，他特别喜欢。每天都要我给他读，现在还会模仿小熊的动作和表情，非常可爱。',
    date: '2024-01-08',
    helpful: 8,
    childAge: '2.5岁'
  }
]

// 相关推荐
const relatedBooks = [
  {
    id: '2',
    title: '猜猜我有多爱你',
    author: '山姆·麦克布雷尼',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨亲子场景，兔子角色，柔和暖色调，表达爱意，绘本插画风格&image_size=square',
    ageRange: '2-6岁',
    rating: 4.9,
    price: 28.8
  },
  {
    id: '3',
    title: '好饿的毛毛虫',
    author: '艾瑞·卡尔',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱毛毛虫角色，色彩鲜艳，儿童绘本风格，充满童趣&image_size=square',
    ageRange: '1-4岁',
    rating: 4.7,
    price: 32.0
  },
  {
    id: '4',
    title: '大卫不可以',
    author: '大卫·香农',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=调皮小男孩角色，温馨教育主题，儿童绘本风格&image_size=square',
    ageRange: '3-6岁',
    rating: 4.6,
    price: 29.9
  }
]

export default function BookDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { favorites, addToFavorites, removeFromFavorites, addToCart } = useStore()
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)
  
  const isFavorite = favorites.books.includes(id || '')
  
  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id || '', 'book')
      toast.success('已取消收藏')
    } else {
      addToFavorites(id || '', 'book')
      toast.success('已添加到收藏')
    }
  }
  
  const handleAddToCart = () => {
    addToCart(bookData, 'book')
    toast.success('已添加到购物车')
  }
  
  const handleStartReading = () => {
    toast.info('开始阅读功能开发中...')
  }
  
  const handleShare = () => {
    toast.info('分享功能开发中...')
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bookData.images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bookData.images.length) % bookData.images.length)
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        title="绘本详情"
        showSearch={false}
        showNotification={false}
      />
      
      <main className="pb-20">
        {/* 图片展示区域 */}
        <section className="relative">
          <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100">
            <img
              src={bookData.images[currentImageIndex]}
              alt={bookData.title}
              className="w-full h-full object-cover"
            />
            
            {/* 图片导航 */}
            {bookData.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-600" />
                </button>
                
                {/* 图片指示器 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {bookData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        index === currentImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/60 hover:bg-white/80'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* 新书标签 */}
          {bookData.isNew && (
            <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              新书
            </div>
          )}
          
          {/* 收藏按钮 */}
          <button
            onClick={handleFavorite}
            className={cn(
              'absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all',
              'bg-white/80 hover:bg-white',
              isFavorite 
                ? 'text-red-500' 
                : 'text-neutral-400 hover:text-red-500'
            )}
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </button>
        </section>
        
        {/* 基本信息 */}
        <section className="px-4 py-6 bg-white">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">{bookData.title}</h1>
            <p className="text-neutral-600 mb-1">作者：{bookData.author}</p>
            <p className="text-neutral-500 text-sm">出版社：{bookData.publisher}</p>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(bookData.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-neutral-300'
                  )}
                />
              ))}
              <span className="text-sm font-medium text-neutral-700 ml-1">
                {bookData.rating}
              </span>
            </div>
            <span className="text-sm text-neutral-500">
              {bookData.reviewCount} 条评价
            </span>
            <div className="flex items-center gap-1 text-sm text-neutral-600">
              <Users className="w-4 h-4" />
              <span>{bookData.ageRange}</span>
            </div>
          </div>
          
          {/* 价格 */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-red-500">¥{bookData.price}</span>
            <span className="text-sm text-neutral-400 line-through">¥{bookData.originalPrice}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
              限时优惠
            </span>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={handleStartReading}
              className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              开始阅读
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-secondary-500 text-white py-3 rounded-xl font-medium hover:bg-secondary-600 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              加入购物车
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-3 border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </section>
        
        {/* 商品介绍 */}
        <section className="px-4 py-6 bg-white border-t border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">商品介绍</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">{bookData.description}</p>
          
          <div className="mb-4">
            <h3 className="font-medium text-neutral-800 mb-2">绘本特色</h3>
            <ul className="space-y-2">
              {bookData.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-neutral-600">
                  <Award className="w-4 h-4 text-primary-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-neutral-800 mb-2">商品参数</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(bookData.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-neutral-500">{key}</span>
                  <span className="text-neutral-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 标签 */}
        <section className="px-4 py-4 bg-white border-t border-neutral-100">
          <div className="flex flex-wrap gap-2">
            {bookData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
        
        {/* 用户评价 */}
        <section className="px-4 py-6 bg-white border-t border-neutral-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-800">用户评价</h2>
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-primary-600 text-sm font-medium hover:text-primary-700"
            >
              {showAllReviews ? '收起' : '查看全部'}
            </button>
          </div>
          
          <div className="space-y-4">
            {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
              <div key={review.id} className="border-b border-neutral-100 pb-4 last:border-b-0">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-neutral-800">{review.userName}</span>
                      <span className="text-xs text-neutral-500">{review.childAge}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-3 h-3',
                              i < review.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-neutral-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm mb-2">{review.content}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-primary-600">
                    <MessageCircle className="w-3 h-3" />
                    <span>有用 ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 相关推荐 */}
        <section className="px-4 py-6 bg-white border-t border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">相关推荐</h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-neutral-50 rounded-xl p-3 cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-neutral-800 mb-1 text-sm line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-neutral-600">{book.rating}</span>
                  </div>
                  <span className="text-sm font-medium text-red-500">¥{book.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}