// localstorage
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  doLogin
} from '@/api/user';
import type { User } from '@/types/index';
import type { Credential } from '@/types/index'


interface UserStore {
  token: string;
  user: User | null;
  isLogin: boolean;
  login: (credentials: { name: string, password: string }) => Promise<void>;
}


// 高阶函数 柯里化
export const useUserStore = create<UserStore>() (
  persist((set) => ({  // state 对象
    token: "",
    user: null,
    isLogin: false,
    login: async ({name, password}) => {
      const res = await doLogin({name, password});
      // console.log(res, '??????');
      // const { token, user } = res.user;
      set({
        user: res.user,
        token: res.token,
        isLogin: true,
      })
    }
  }), {
    name: 'user-store',
    partialize: (state) => ({
      token: state.token,
      user: state.user,
      isLogin: state.isLogin,
    })
  })
)