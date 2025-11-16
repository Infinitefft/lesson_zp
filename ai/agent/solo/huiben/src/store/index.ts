import { create } from 'zustand'

// 应用状态管理
interface AppState {
  // 用户信息
  user: {
    id: string | null
    name: string | null
    phone: string | null
    avatar: string | null
  }
  
  // 孩子信息
  children: Array<{
    id: string
    name: string
    age: number
    interests: string[]
    avatar: string | null
  }>
  
  // 当前选中的孩子
  currentChild: string | null
  
  // 购物车
  cart: Array<{
    id: string
    type: 'book' | 'activity'
    item: any
    quantity: number
  }>
  
  // 收藏
  favorites: {
    books: string[]
    activities: string[]
  }
  
  // 阅读记录
  readingRecords: Array<{
    id: string
    bookId: string
    childId: string
    readAt: Date
    rating?: number
    notes?: string
    photos?: string[]
  }>
  
  // 设置当前孩子
  setCurrentChild: (childId: string) => void
  
  // 添加到购物车
  addToCart: (item: any, type: 'book' | 'activity') => void
  
  // 从购物车移除
  removeFromCart: (id: string) => void
  
  // 清空购物车
  clearCart: () => void
  
  // 添加收藏
  addToFavorites: (id: string, type: 'book' | 'activity') => void
  
  // 移除收藏
  removeFromFavorites: (id: string, type: 'book' | 'activity') => void
  
  // 添加阅读记录
  addReadingRecord: (record: any) => void
  
  // 设置用户信息
  setUser: (user: any) => void
  
  // 添加孩子
  addChild: (child: any) => void
  
  // 更新孩子信息
  updateChild: (childId: string, updates: any) => void
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: null,
    name: null,
    phone: null,
    avatar: null,
  },
  
  children: [],
  currentChild: null,
  
  cart: [],
  
  favorites: {
    books: [],
    activities: [],
  },
  
  readingRecords: [],
  
  setCurrentChild: (childId) => set({ currentChild: childId }),
  
  addToCart: (item, type) => set((state) => ({
    cart: [...state.cart, {
      id: Date.now().toString(),
      type,
      item,
      quantity: 1,
    }],
  })),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id),
  })),
  
  clearCart: () => set({ cart: [] }),
  
  addToFavorites: (id, type) => set((state) => ({
    favorites: {
      ...state.favorites,
      [type === 'book' ? 'books' : 'activities']: [
        ...state.favorites[type === 'book' ? 'books' : 'activities'],
        id,
      ],
    },
  })),
  
  removeFromFavorites: (id, type) => set((state) => ({
    favorites: {
      ...state.favorites,
      [type === 'book' ? 'books' : 'activities']: 
        state.favorites[type === 'book' ? 'books' : 'activities'].filter(item => item !== id),
    },
  })),
  
  addReadingRecord: (record) => set((state) => ({
    readingRecords: [...state.readingRecords, {
      ...record,
      id: Date.now().toString(),
      readAt: new Date(),
    }],
  })),
  
  setUser: (user) => set({ user }),
  
  addChild: (child) => set((state) => ({
    children: [...state.children, {
      ...child,
      id: Date.now().toString(),
    }],
  })),
  
  updateChild: (childId, updates) => set((state) => ({
    children: state.children.map(child => 
      child.id === childId ? { ...child, ...updates } : child
    ),
  })),
}))