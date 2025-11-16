import { Heart, Star, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

interface BookCardProps {
  id: string
  title: string
  author: string
  cover: string
  ageRange: string
  rating: number
  isFavorite: boolean
  isNew?: boolean
  onFavorite: (id: string) => void
  onClick: (id: string) => void
}

export default function BookCard({
  id,
  title,
  author,
  cover,
  ageRange,
  rating,
  isFavorite,
  isNew = false,
  onFavorite,
  onClick
}: BookCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative">
        <img
          src={cover}
          alt={title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onClick(id)}
        />
        
        {/* 新书标签 */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            新书
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
          className="font-semibold text-neutral-800 mb-1 line-clamp-1 cursor-pointer hover:text-primary-600 transition-colors"
          onClick={() => onClick(id)}
        >
          {title}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">{author}</p>
        
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{ageRange}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}