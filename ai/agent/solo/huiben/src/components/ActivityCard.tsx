import { MapPin, Calendar, Users, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

interface ActivityCardProps {
  id: string
  title: string
  image: string
  location: string
  date: string
  time: string
  participants: number
  maxParticipants: number
  price: number
  isFavorite: boolean
  isFull?: boolean
  onFavorite: (id: string) => void
  onClick: (id: string) => void
}

export default function ActivityCard({
  id,
  title,
  image,
  location,
  date,
  time,
  participants,
  maxParticipants,
  price,
  isFavorite,
  isFull = false,
  onFavorite,
  onClick
}: ActivityCardProps) {
  const progress = (participants / maxParticipants) * 100
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover cursor-pointer"
          onClick={() => onClick(id)}
        />
        
        {/* 活动状态标签 */}
        {isFull ? (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            已满员
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            报名中
          </div>
        )}
        
        {/* 收藏按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavorite(id)
          }}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
            'bg-white/80 hover:bg-white shadow-md',
            isFavorite 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-neutral-400 hover:text-red-500'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 
          className="font-semibold text-neutral-800 mb-2 line-clamp-1 cursor-pointer hover:text-primary-600 transition-colors"
          onClick={() => onClick(id)}
        >
          {title}
        </h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        
        {/* 参与进度 */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>报名进度</span>
            <span>{participants}/{maxParticipants}</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1">
            <div 
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                progress >= 80 ? 'bg-red-400' : 'bg-primary-400'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* 价格和报名 */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            ¥{price}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick(id)
            }}
            disabled={isFull}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              isFull
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95'
            )}
          >
            {isFull ? '已满员' : '立即报名'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}