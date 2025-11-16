import { Search, Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils'
import { useStore } from '@/store'

interface HeaderProps {
  title?: string
  showSearch?: boolean
  showNotification?: boolean
  showLogin?: boolean
  onSearchClick?: () => void
  onNotificationClick?: () => void
  onLoginClick?: () => void
}

export default function Header({ 
  title = '绘本岛', 
  showSearch = true, 
  showNotification = true,
  showLogin = true,
  onSearchClick,
  onNotificationClick,
  onLoginClick
}: HeaderProps) {
  const { user } = useStore()
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600 font-display">
          {title}
        </h1>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <button
              onClick={onSearchClick}
              className={cn(
                'p-2 rounded-full transition-colors duration-200',
                'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          
          {showNotification && (
            <button
              onClick={onNotificationClick}
              className={cn(
                'p-2 rounded-full transition-colors duration-200 relative',
                'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              <Bell className="w-5 h-5" />
              {/* 通知红点 */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          )}
          
          {showLogin && !user.id && (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors duration-200"
            >
              登录
            </button>
          )}
          
          {showLogin && user.id && user.avatar && (
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-200 hover:border-primary-400 transition-colors"
            >
              <img src={user.avatar} alt="用户头像" className="w-full h-full object-cover" />
            </button>
          )}
          
          {showLogin && user.id && !user.avatar && (
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
            >
              <User className="w-4 h-4 text-primary-600" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}