import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MessageCircle, ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store'

interface LoginForm {
  phone: string
  password: string
  remember: boolean
}

interface RegisterForm {
  phone: string
  password: string
  confirmPassword: string
  verificationCode: string
  agree: boolean
}

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useStore()
  
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const loginForm = useForm<LoginForm>()
  const registerForm = useForm<RegisterForm>()
  
  const handleLogin = (data: LoginForm) => {
    // 模拟登录
    toast.success('登录成功！')
    setUser({
      id: '1',
      name: '张妈妈',
      phone: data.phone,
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=温馨妈妈头像，柔和风格，亲子主题&image_size=square'
    })
    navigate('/')
  }
  
  const handleRegister = (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('两次输入的密码不一致')
      return
    }
    
    // 模拟注册
    toast.success('注册成功！')
    setUser({
      id: '1',
      name: '新用户',
      phone: data.phone,
      avatar: null
    })
    navigate('/child-setup')
  }
  
  const handleQuickLogin = (type: 'wechat' | 'sms') => {
    if (type === 'wechat') {
      toast.info('微信登录功能开发中...')
    } else {
      toast.info('短信登录功能开发中...')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* 返回按钮 */}
      <div className="pt-8 px-4">
        <button
          onClick={() => navigate('/')}
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
          {/* Logo和标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl flex items-center justify-center">
              <div className="text-white text-2xl font-bold font-display">绘</div>
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2 font-display">
              {isLogin ? '欢迎回来' : '注册账号'}
            </h1>
            <p className="text-neutral-600">
              {isLogin ? '让亲子时光，更温暖一点' : '开启美好的亲子阅读之旅'}
            </p>
          </div>
          
          {/* 切换标签 */}
          <div className="flex bg-neutral-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                'flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-200',
                isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-800'
              )}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                'flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-200',
                !isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-800'
              )}
            >
              注册
            </button>
          </div>
          
          {/* 登录表单 */}
          {isLogin && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  手机号
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="tel"
                    {...loginForm.register('phone', { 
                      required: '请输入手机号',
                      pattern: {
                        value: /^1[3-9]\d{9}$/,
                        message: '请输入正确的手机号'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="请输入手机号"
                  />
                </div>
                {loginForm.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...loginForm.register('password', { 
                      required: '请输入密码',
                      minLength: {
                        value: 6,
                        message: '密码至少6位'
                      }
                    })}
                    className="w-full pl-4 pr-12 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...loginForm.register('remember')}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-600">记住我</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.info('找回密码功能开发中...')}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  忘记密码？
                </button>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 active:scale-95 transition-all duration-200"
              >
                登录
              </button>
            </motion.form>
          )}
          
          {/* 注册表单 */}
          {!isLogin && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={registerForm.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  手机号
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="tel"
                    {...registerForm.register('phone', { 
                      required: '请输入手机号',
                      pattern: {
                        value: /^1[3-9]\d{9}$/,
                        message: '请输入正确的手机号'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="请输入手机号"
                  />
                </div>
                {registerForm.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  验证码
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...registerForm.register('verificationCode', { 
                        required: '请输入验证码',
                        pattern: {
                          value: /^\d{6}$/,
                          message: '请输入6位验证码'
                        }
                      })}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder="请输入验证码"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.info('验证码功能开发中...')}
                    className="px-4 py-3 bg-neutral-100 text-neutral-600 rounded-xl font-medium hover:bg-neutral-200 transition-colors"
                  >
                    获取验证码
                  </button>
                </div>
                {registerForm.formState.errors.verificationCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.verificationCode.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerForm.register('password', { 
                      required: '请输入密码',
                      minLength: {
                        value: 6,
                        message: '密码至少6位'
                      }
                    })}
                    className="w-full pl-4 pr-12 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...registerForm.register('confirmPassword', { 
                      required: '请确认密码'
                    })}
                    className="w-full pl-4 pr-12 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="请再次输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...registerForm.register('agree', { 
                    required: '请同意用户协议'
                  })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-0.5"
                />
                <span className="text-sm text-neutral-600">
                  我已阅读并同意
                  <button
                    type="button"
                    onClick={() => toast.info('用户协议功能开发中...')}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    《用户协议》
                  </button>
                  和
                  <button
                    type="button"
                    onClick={() => toast.info('隐私政策功能开发中...')}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    《隐私政策》
                  </button>
                </span>
              </label>
              {registerForm.formState.errors.agree && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.agree.message}
                </p>
              )}
              
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 active:scale-95 transition-all duration-200"
              >
                注册
              </button>
            </motion.form>
          )}
          
          {/* 快速登录 */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-primary-50 via-white to-secondary-50 text-neutral-500">
                  快速登录
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickLogin('wechat')}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:scale-95 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                微信登录
              </button>
              <button
                onClick={() => handleQuickLogin('sms')}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                短信登录
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}