import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Book, Users, Sparkles, Gift } from 'lucide-react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import BannerCarousel from '@/components/BannerCarousel'
import BookCard from '@/components/BookCard'
import ActivityCard from '@/components/ActivityCard'
import { useStore } from '@/store'

// 模拟数据
const hotBooks = [
  {
    id: '1',
    title: '小熊宝宝绘本系列',
    author: '佐佐木洋子',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱小熊宝宝角色，温馨绘本风格，柔和色彩，儿童插画&image_size=square',
    ageRange: '0-3岁',
    rating: 4.8,
    isFavorite: false,
    isNew: true
  },
  {
    id: '2',
    title: '猜猜我有多爱你',
    author: '山姆·麦克布雷尼',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨亲子场景，兔子角色，柔和暖色调，表达爱意，绘本插画风格&image_size=square',
    ageRange: '2-6岁',
    rating: 4.9,
    isFavorite: true,
    isNew: false
  },
  {
    id: '3',
    title: '好饿的毛毛虫',
    author: '艾瑞·卡尔',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱毛毛虫角色，色彩鲜艳，儿童绘本风格，充满童趣&image_size=square',
    ageRange: '1-4岁',
    rating: 4.7,
    isFavorite: false,
    isNew: true
  }
]

const activities = [
  {
    id: '1',
    title: '亲子绘本故事会',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子阅读活动场景，温馨明亮，孩子和家长一起听故事，图书馆环境&image_size=landscape_4_3',
    location: '北京市朝阳区绘本馆',
    date: '12月20日',
    time: '10:00-11:30',
    participants: 15,
    maxParticipants: 20,
    price: 68,
    isFavorite: false,
    isFull: false
  },
  {
    id: '2',
    title: '创意手工绘本制作',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子手工制作场景，制作绘本，创意工坊，温馨明亮，孩子和家长一起创作&image_size=landscape_4_3',
    location: '上海市浦东新区活动中心',
    date: '12月22日',
    time: '14:00-16:00',
    participants: 8,
    maxParticipants: 12,
    price: 128,
    isFavorite: true,
    isFull: false
  }
]

export default function Home() {
  const navigate = useNavigate()
  const { favorites, addToFavorites, removeFromFavorites } = useStore()
  
  const [currentPath, setCurrentPath] = useState('/')
  
  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    navigate(path)
  }
  
  const handleSearchClick = () => {
    navigate('/search')
  }
  
  const handleNotificationClick = () => {
    navigate('/notifications')
  }
  
  const handleBookFavorite = (bookId: string) => {
    const isFavorite = favorites.books.includes(bookId)
    if (isFavorite) {
      removeFromFavorites(bookId, 'book')
    } else {
      addToFavorites(bookId, 'book')
    }
  }
  
  const handleActivityFavorite = (activityId: string) => {
    const isFavorite = favorites.activities.includes(activityId)
    if (isFavorite) {
      removeFromFavorites(activityId, 'activity')
    } else {
      addToFavorites(activityId, 'activity')
    }
  }
  
  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`)
  }
  
  const handleActivityClick = (activityId: string) => {
    navigate(`/activities/${activityId}`)
  }
  
  const handleLoginClick = () => {
    navigate('/login')
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
        onLoginClick={handleLoginClick}
      />
      
      <main className="pb-20">
        {/* 轮播图区域 */}
        <section className="px-4 py-4">
          <BannerCarousel />
        </section>
        
        {/* 热门绘本 */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-bold text-neutral-800">热门绘本</h2>
            </div>
            <button 
              onClick={() => handleNavigate('/books')}
              className="text-primary-600 text-sm font-medium hover:text-primary-700"
            >
              查看更多
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {hotBooks.map((book) => (
              <BookCard
                key={book.id}
                {...book}
                isFavorite={favorites.books.includes(book.id)}
                onFavorite={handleBookFavorite}
                onClick={handleBookClick}
              />
            ))}
          </div>
        </section>
        
        {/* 亲子活动 */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary-600" />
              <h2 className="text-lg font-bold text-neutral-800">亲子活动</h2>
            </div>
            <button 
              onClick={() => handleNavigate('/activities')}
              className="text-secondary-600 text-sm font-medium hover:text-secondary-700"
            >
              查看更多
            </button>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                isFavorite={favorites.activities.includes(activity.id)}
                onFavorite={handleActivityFavorite}
                onClick={handleActivityClick}
              />
            ))}
          </div>
        </section>
        
        {/* 推荐专题 */}
        <section className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent-600" />
            <h2 className="text-lg font-bold text-neutral-800">推荐专题</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl cursor-pointer"
              onClick={() => handleNavigate('/books?category=emotion-management')}
            >
              <Gift className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-neutral-800 mb-1">情绪管理</h3>
              <p className="text-sm text-neutral-600">帮助孩子认识情绪</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-4 rounded-2xl cursor-pointer"
              onClick={() => handleNavigate('/books?category=nature')}
            >
              <Book className="w-8 h-8 text-secondary-600 mb-2" />
              <h3 className="font-semibold text-neutral-800 mb-1">自然探索</h3>
              <p className="text-sm text-neutral-600">探索大自然奥秘</p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <BottomNav currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  )
}