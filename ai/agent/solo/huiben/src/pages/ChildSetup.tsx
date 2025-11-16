import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ChevronLeft, User, Baby, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store'

interface ChildForm {
  name: string
  age: string
  gender: 'boy' | 'girl'
  interests: string[]
  avatar?: FileList
}

const interestOptions = [
  '动物世界', '童话故事', '科学探索', '艺术创作',
  '音乐律动', '运动游戏', '自然观察', '手工制作'
]

export default function ChildSetup() {
  const navigate = useNavigate()
  const { addChild } = useStore()
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ChildForm>()
  
  const selectedInterests = watch('interests') || []
  
  const onSubmit = (data: ChildForm) => {
    if (selectedInterests.length === 0) {
      toast.error('请至少选择一个兴趣标签')
      return
    }
    
    addChild({
      name: data.name,
      age: parseFloat(data.age),
      interests: selectedInterests,
      avatar: null,
      gender: data.gender
    })
    
    toast.success('孩子信息设置成功！')
    navigate('/')
  }
  
  const toggleInterest = (interest: string) => {
    const current = selectedInterests
    if (current.includes(interest)) {
      setValue('interests', current.filter(i => i !== interest))
    } else {
      setValue('interests', [...current, interest])
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* 返回按钮 */}
      <div className="pt-8 px-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>返回</span>
        </button>
      </div>
      
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl flex items-center justify-center">
              <Baby className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2 font-display">
              添加宝贝信息
            </h1>
            <p className="text-neutral-600">
              让我们为您的宝贝推荐合适的绘本和活动
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 宝贝姓名 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                宝贝姓名 *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  {...register('name', { 
                    required: '请输入宝贝姓名',
                    minLength: {
                      value: 2,
                      message: '姓名至少2个字'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="请输入宝贝的小名或姓名"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            {/* 年龄 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                宝贝年龄 *
              </label>
              <select
                {...register('age', { required: '请选择宝贝年龄' })}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">请选择年龄</option>
                <option value="0.5">6个月以下</option>
                <option value="0.5">6-12个月</option>
                <option value="1">1岁</option>
                <option value="2">2岁</option>
                <option value="3">3岁</option>
                <option value="4">4岁</option>
                <option value="5">5岁</option>
                <option value="6">6岁</option>
                <option value="7">7岁以上</option>
              </select>
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>
            
            {/* 性别 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                宝贝性别
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    value="boy"
                    {...register('gender')}
                    className="sr-only"
                  />
                  <div className={cn(
                    'flex items-center justify-center gap-2 py-3 px-4 border rounded-xl cursor-pointer transition-all',
                    'border-neutral-200 hover:border-primary-300',
                    watch('gender') === 'boy' && 'border-primary-500 bg-primary-50 text-primary-700'
                  )}>
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span>男宝宝</span>
                  </div>
                </label>
                
                <label className="relative">
                  <input
                    type="radio"
                    value="girl"
                    {...register('gender')}
                    className="sr-only"
                  />
                  <div className={cn(
                    'flex items-center justify-center gap-2 py-3 px-4 border rounded-xl cursor-pointer transition-all',
                    'border-neutral-200 hover:border-primary-300',
                    watch('gender') === 'girl' && 'border-pink-500 bg-pink-50 text-pink-700'
                  )}>
                    <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                    <span>女宝宝</span>
                  </div>
                </label>
              </div>
            </div>
            
            {/* 兴趣标签 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                兴趣标签 *（至少选择1个）
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      'py-2 px-3 border rounded-lg text-sm transition-all duration-200',
                      'border-neutral-200 hover:border-primary-300',
                      selectedInterests.includes(interest)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'text-neutral-600 hover:text-neutral-800'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <Heart className={cn(
                        'w-3 h-3',
                        selectedInterests.includes(interest) && 'text-primary-600'
                      )} />
                      <span>{interest}</span>
                    </div>
                  </button>
                ))}
              </div>
              {selectedInterests.length === 0 && (
                <p className="text-red-500 text-sm mt-1">请至少选择一个兴趣标签</p>
              )}
            </div>
            
            {/* 头像上传（可选） */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                宝贝头像（可选）
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Baby className="w-8 h-8 text-neutral-400" />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    {...register('avatar')}
                  />
                  <div className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 hover:border-primary-300 hover:text-primary-600 transition-colors">
                    上传头像
                  </div>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 active:scale-95 transition-all duration-200"
            >
              完成设置
            </button>
          </form>
          
          {/* 跳过设置 */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              跳过，稍后再设置
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}