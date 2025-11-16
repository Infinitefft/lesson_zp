import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, X, ChevronDown, Star, Heart, Clock, Book } from 'lucide-react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import BookCard from '@/components/BookCard'
import { useStore } from '@/store'

// 模拟数据
const allBooks = [
  {
    id: '1',
    title: '小熊宝宝绘本系列',
    author: '佐佐木洋子',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱小熊宝宝角色，温馨绘本风格，柔和色彩，儿童插画&image_size=square',
    ageRange: '0-3岁',
    rating: 4.8,
    isFavorite: false,
    isNew: true,
    category: '情绪管理',
    tags: ['情绪管理', '生活习惯']
  },
  {
    id: '2',
    title: '猜猜我有多爱你',
    author: '山姆·麦克布雷尼',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨亲子场景，兔子角色，柔和暖色调，表达爱意，绘本插画风格&image_size=square',
    ageRange: '2-6岁',
    rating: 4.9,
    isFavorite: true,
    isNew: false,
    category: '亲情友情',
    tags: ['亲情', '友情', '爱']
  },
  {
    id: '3',
    title: '好饿的毛毛虫',
    author: '艾瑞·卡尔',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱毛毛虫角色，色彩鲜艳，儿童绘本风格，充满童趣&image_size=square',
    ageRange: '1-4岁',
    rating: 4.7,
    isFavorite: false,
    isNew: true,
    category: '自然探索',
    tags: ['自然', '动物', '认知']
  },
  {
    id: '4',
    title: '大卫不可以',
    author: '大卫·香农',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=调皮小男孩角色，温馨教育主题，儿童绘本风格&image_size=square',
    ageRange: '3-6岁',
    rating: 4.6,
    isFavorite: false,
    isNew: false,
    category: '行为习惯',
    tags: ['行为', '规则', '成长']
  },
  {
    id: '5',
    title: '彩虹色的花',
    author: '麦克·格雷涅茨',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=美丽彩虹花朵，温暖色彩，儿童绘本插画风格&image_size=square',
    ageRange: '2-5岁',
    rating: 4.8,
    isFavorite: true,
    isNew: false,
    category: '亲情友情',
    tags: ['分享', '友情', '色彩']
  },
  {
    id: '6',
    title: '我爸爸',
    author: '安东尼·布朗',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨父子场景，超级英雄爸爸，温暖色调，儿童绘本风格&image_size=square',
    ageRange: '2-6岁',
    rating: 4.9,
    isFavorite: false,
    isNew: true,
    category: '亲情友情',
    tags: ['父爱', '亲情', '想象力']
  }
]

const categories = [
  { id: 'all', name: '全部', icon: Book },
  { id: 'emotion-management', name: '情绪管理', icon: Heart },
  { id: 'family-friendship', name: '亲情友情', icon: Heart },
  { id: 'nature', name: '自然探索', icon: Star },
  { id: 'behavior', name: '行为习惯', icon: Clock },
]

const ageRanges = ['0-1岁', '1-3岁', '3-6岁', '6岁以上']
const sortOptions = [
  { id: 'default', name: '默认排序' },
  { id: 'rating', name: '评分最高' },
  { id: 'newest', name: '最新上架' },
  { id: 'popular', name: '最受欢迎' },
]

export default function Books() {
  const navigate = useNavigate()
  const { favorites, addToFavorites, removeFromFavorites } = useStore()
  
  const [currentPath, setCurrentPath] = useState('/books')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAgeRange, setSelectedAgeRange] = useState('')
  const [selectedSort, setSelectedSort] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  
  const [currentPathHeader, setCurrentPathHeader] = useState('/books')
  
  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    setCurrentPathHeader(path)
    navigate(path)
  }
  
  const handleSearchClick = () => {
    // 搜索功能将在搜索页面实现
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
  
  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`)
  }
  
  // 筛选和搜索逻辑
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesAgeRange = !selectedAgeRange || book.ageRange.includes(selectedAgeRange)
    
    return matchesSearch && matchesCategory && matchesAgeRange
  })
  
  // 排序逻辑
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (selectedSort) {
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case 'popular':
        return b.rating - a.rating // 这里可以用收藏数等数据
      default:
        return 0
    }
  })
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        title="绘本馆"
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
      />
      
      <main className="pb-20">
        {/* 搜索栏 */}
        <section className="px-4 py-4 bg-white border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索绘本名称或作者"
              className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
        
        {/* 筛选栏 */}
        <section className="px-4 py-3 bg-white border-b border-neutral-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors whitespace-nowrap',
                showFilters 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              <Filter className="w-4 h-4" />
              <span>筛选</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
            
            {/* 分类标签 */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors whitespace-nowrap',
                  selectedCategory === category.id
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                )}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
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
                {/* 年龄段筛选 */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">年龄段</h4>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedAgeRange('')}
                      className={cn(
                        'px-3 py-1 rounded-full text-sm transition-colors',
                        !selectedAgeRange
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      )}
                    >
                      全部
                    </button>
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
                
                {/* 排序选项 */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">排序</h4>
                  <div className="flex gap-2 flex-wrap">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedSort(option.id)}
                        className={cn(
                          'px-3 py-1 rounded-full text-sm transition-colors',
                          selectedSort === option.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        )}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        
        {/* 绘本列表 */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-600">
              共找到 <span className="font-medium text-neutral-800">{sortedBooks.length}</span> 本绘本
            </p>
          </div>
          
          {sortedBooks.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">暂无符合条件的绘本</p>
              <p className="text-sm text-neutral-400 mt-1">试试调整筛选条件吧</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {sortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  isFavorite={favorites.books.includes(book.id)}
                  onFavorite={handleBookFavorite}
                  onClick={handleBookClick}
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