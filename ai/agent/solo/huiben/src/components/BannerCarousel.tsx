import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/utils'

interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
  type: 'book' | 'activity' | 'promotion'
}

interface BannerCarouselProps {
  banners?: Banner[]
  autoPlay?: boolean
  interval?: number
}

const defaultBanners: Banner[] = [
  {
    id: '1',
    title: '六一儿童节精选',
    subtitle: '精选优质绘本，陪伴宝贝快乐成长',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨亲子阅读场景，柔和色调，父母和孩子一起阅读绘本，充满童趣，手绘风格&image_size=landscape_16_9',
    link: '/books?category=childrens-day',
    type: 'promotion'
  },
  {
    id: '2',
    title: '情绪管理绘本专区',
    subtitle: '帮助孩子认识和管理情绪',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=可爱动物角色表达不同情绪，温馨治愈风格，儿童绘本插画风格&image_size=landscape_16_9',
    link: '/books?category=emotion-management',
    type: 'book'
  },
  {
    id: '3',
    title: '周末亲子手工课',
    subtitle: '动手又动脑，增进亲子感情',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=亲子手工活动场景，温馨明亮，孩子和家长一起做手工，创意工坊氛围&image_size=landscape_16_9',
    link: '/activities?category=handcraft',
    type: 'activity'
  }
]

export default function BannerCarousel({ 
  banners = defaultBanners, 
  autoPlay = true, 
  interval = 4000 
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [autoPlay, interval, banners.length])
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }
  
  if (banners.length === 0) return null
  
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100">
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-full">
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className={cn(
                  'inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 w-fit',
                  banner.type === 'promotion' && 'bg-accent-100 text-accent-800',
                  banner.type === 'book' && 'bg-primary-100 text-primary-800',
                  banner.type === 'activity' && 'bg-secondary-100 text-secondary-800'
                )}>
                  {banner.type === 'promotion' && '限时活动'}
                  {banner.type === 'book' && '绘本推荐'}
                  {banner.type === 'activity' && '亲子活动'}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2 font-display">
                  {banner.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {banner.subtitle}
                </p>
                <button className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-50 transition-colors duration-200 w-fit">
                  立即查看
                </button>
              </div>
              <div className="w-32 h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover rounded-r-2xl"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 导航按钮 */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </>
      )}
      
      {/* 指示器 */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/60 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}