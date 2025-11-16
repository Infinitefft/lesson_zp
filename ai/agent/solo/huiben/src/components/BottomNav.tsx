import { Book, Users, Clock, User, Home, Search, Heart, ShoppingCart } from 'lucide-react'
import { cn } from '@/utils'

interface BottomNavProps {
  currentPath: string
  onNavigate: (path: string) => void
}

export default function BottomNav({ currentPath, onNavigate }: BottomNavProps) {
  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/books', icon: Book, label: '绘本馆' },
    { path: '/activities', icon: Users, label: '活动' },
    { path: '/records', icon: Clock, label: '记录' },
    { path: '/profile', icon: User, label: '我的' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path
          
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200',
                isActive 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-1', isActive && 'animate-bounce-gentle')} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}