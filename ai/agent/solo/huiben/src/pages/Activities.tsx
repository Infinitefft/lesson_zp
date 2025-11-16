import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Calendar, Clock, Users, Filter, Search, 
  ChevronDown, Heart, Share2, Phone, Navigation 
} from 'lucide-react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import ActivityCard from '@/components/ActivityCard'
import { useStore } from '@/store'

// 模拟活动数据
const allActivities = [
  {
    id: '1',
    title: '亲子绘本故事会',
    subtitle: '温馨故事时光，增进亲子感情',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子阅读活动场景，温馨明亮，孩子和家长一起听故事，图书馆环境&image_size=landscape_16_9',
    location: '北京市朝阳区绘本馆',
    address: '朝阳区建国路88号',
    date: '12月20日',
    time: '10:00-11:30',
    participants: 15,
    maxParticipants: 20,
    price: 68,
    isFavorite: false,
    isFull: false,
    category: 'storytelling',
    type: 'reading',
    tags: ['绘本阅读', '亲子互动', '语言发展'],
    description: '专业老师带领家长和孩子一起阅读经典绘本，通过生动有趣的故事讲述，培养孩子的阅读兴趣和语言表达能力。',
    highlights: [
      '专业绘本老师指导',
      '互动式故事讲述',
      '培养阅读兴趣',
      '增进亲子感情'
    ],
    requirements: ['适合2-6岁儿童', '需家长陪同', '请提前10分钟到场']
  },
  {
    id: '2',
    title: '创意手工绘本制作',
    subtitle: '动手创作，激发创造力',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子手工制作场景，制作绘本，创意工坊，温馨明亮，孩子和家长一起创作&image_size=landscape_16_9',
    location: '上海市浦东新区活动中心',
    address: '浦东新区世纪大道100号',
    date: '12月22日',
    time: '14:00-16:00',
    participants: 8,
    maxParticipants: 12,
    price: 128,
    isFavorite: true,
    isFull: false,
    category: 'handcraft',
    type: 'creative',
    tags: ['手工制作', '创意美术', '亲子合作'],
    description: '家长和孩子一起动手制作属于自己的绘本，从故事构思到绘画制作，体验完整的创作过程。',
    highlights: [
      '专业美术指导',
      '提供所有材料',
      '作品可带回家',
      '培养创造力'
    ],
    requirements: ['适合3-8岁儿童', '需家长陪同', '建议穿着易清洗衣物']
  },
  {
    id: '3',
    title: '周末亲子营',
    subtitle: '户外探索，亲近大自然',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子户外活动场景，自然环境，森林探索，温馨明亮，孩子和家长一起观察自然&image_size=landscape_16_9',
    location: '深圳市南山区公园',
    address: '南山区深南大道123号',
    date: '12月23日',
    time: '09:00-16:00',
    participants: 20,
    maxParticipants: 25,
    price: 198,
    isFavorite: false,
    isFull: true,
    category: 'outdoor',
    type: 'exploration',
    tags: ['户外探索', '自然科学', '亲子运动'],
    description: '在大自然中进行亲子探索活动，观察植物昆虫，学习自然知识，享受户外运动的乐趣。',
    highlights: [
      '专业自然导师',
      '观察记录册',
      '户外安全指导',
      '营养午餐提供'
    ],
    requirements: ['适合4-10岁儿童', '需家长陪同', '请穿着运动装', '自带水杯']
  },
  {
    id: '4',
    title: '音乐律动课',
    subtitle: '音乐启蒙，节奏感知',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子音乐活动场景，温馨明亮，乐器演奏，孩子和家长一起唱歌跳舞&image_size=landscape_16_9',
    location: '广州市天河区音乐中心',
    address: '天河区天河路456号',
    date: '12月24日',
    time: '10:30-11:30',
    participants: 12,
    maxParticipants: 15,
    price: 88,
    isFavorite: false,
    isFull: false,
    category: 'music',
    type: 'art',
    tags: ['音乐启蒙', '节奏训练', '亲子互动'],
    description: '通过音乐游戏、律动活动，培养孩子的音乐感知能力和节奏感，增进亲子间的音乐互动。',
    highlights: [
      '专业音乐老师',
      '多种乐器体验',
      '音乐游戏互动',
      '培养音乐兴趣'
    ],
    requirements: ['适合1-5岁儿童', '需家长陪同', '请穿着舒适服装']
  }
]

const categories = [
  { id: 'all', name: '全部活动', icon: Users },
  { id: 'reading', name: '绘本阅读', icon: Book },
  { id: 'creative', name: '创意手工', icon: Heart },
  { id: 'outdoor', name: '户外探索', icon: MapPin },
  { id: 'art', name: '艺术启蒙', icon: Star },
]

const cities = ['全部城市', '北京', '上海', '广州', '深圳', '杭州', '成都']
const ageRanges = ['全部年龄', '0-1岁', '1-3岁', '3-6岁', '6岁以上']

export default function Activities() {
  const navigate = useNavigate()
  const { favorites, addToFavorites, removeFromFavorites } = useStore()
  
  const [currentPath, setCurrentPath] = useState('/activities')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('全部城市')
  const [selectedAgeRange, setSelectedAgeRange] = useState('全部年龄')
  const [showFilters, setShowFilters] = useState(false)
  const [showMap, setShowMap] = useState(false)
  
  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    navigate(path)
  }
  
  const handleSearchClick = () => {
    // 搜索功能将在搜索页面实现
  }
  
  const handleNotificationClick = () => {
    navigate('/notifications')
  }
  
  const handleActivityFavorite = (activityId: string) => {
    const isFavorite = favorites.activities.includes(activityId)
    if (isFavorite) {
      removeFromFavorites(activityId, 'activity')
    } else {
      addToFavorites(activityId, 'activity')
    }
  }
  
  const handleActivityClick = (activityId: string) => {
    navigate(`/activities/${activityId}`)
  }
  
  const handleMapClick = () => {
    setShowMap(!showMap)
  }
  
  // 筛选和搜索逻辑
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || activity.type === selectedCategory
    const matchesCity = selectedCity === '全部城市' || activity.location.includes(selectedCity)
    const matchesAgeRange = selectedAgeRange === '全部年龄' || 
                           (selectedAgeRange === '0-1岁' && activity.tags.some(tag => tag.includes('0-1'))) ||
                           (selectedAgeRange === '1-3岁' && activity.tags.some(tag => tag.includes('1-3'))) ||
                           (selectedAgeRange === '3-6岁' && activity.tags.some(tag => tag.includes('3-6'))) ||
                           (selectedAgeRange === '6岁以上' && activity.tags.some(tag => tag.includes('6+')))
    
    return matchesSearch && matchesCategory && matchesCity && matchesAgeRange
  })
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        title="亲子活动"
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
      />
      
      <main className="pb-20">
        {/* 搜索栏 */}
        <section className="px-4 py-4 bg-white border-b border-neutral-200">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索活动名称或关键词"
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          {/* 快速筛选按钮 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMapClick}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
                showMap 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              <Navigation className="w-4 h-4" />
              <span className="text-sm">地图</span>
            </button>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
                showFilters 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">筛选</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
            
            {/* 分类标签 */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                )}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* 展开的筛选选项 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-neutral-100"
              >
                {/* 城市筛选 */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">城市</h4>
                  <div className="flex gap-2 flex-wrap">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={cn(
                          'px-3 py-1 rounded-full text-sm transition-colors',
                          selectedCity === city
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        )}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 年龄段筛选 */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">年龄段</h4>
                  <div className="flex gap-2 flex-wrap">
                    {ageRanges.map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAgeRange(age)}
                        className={cn(
                          'px-3 py-1 rounded-full text-sm transition-colors',
                          selectedAgeRange === age
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        )}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        
        {/* 地图展示区域 */}
        {showMap && (
          <section className="px-4 py-4 bg-white border-b border-neutral-200">
            <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                <p className="text-neutral-600 font-medium">活动地图</p>
                <p className="text-sm text-neutral-500 mt-1">显示附近的活动位置</p>
              </div>
              
              {/* 模拟地图标记 */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-16 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-8 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
          </section>
        )}
        
        {/* 活动列表 */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-600">
              共找到 <span className="font-medium text-neutral-800">{filteredActivities.length}</span> 个活动
            </p>
            <button className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
              <Phone className="w-4 h-4" />
              <span>联系客服</span>
            </button>
          </div>
          
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">暂无符合条件的活动</p>
              <p className="text-sm text-neutral-400 mt-1">试试调整筛选条件吧</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  isFavorite={favorites.activities.includes(activity.id)}
                  onFavorite={handleActivityFavorite}
                  onClick={handleActivityClick}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      
      <BottomNav currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  )
}