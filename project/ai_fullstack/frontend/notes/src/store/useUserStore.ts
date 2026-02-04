// localstorage
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  doLogin
} from '@/api/user';
import type { User } from '@/types/index';
import type { Credential } from '@/types/index'


interface UserStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogin: boolean;
  login: (credentials: { name: string, password: string }) => Promise<void>;
}


// 高阶函数 柯里化
export const useUserStore = create<UserStore>() (
  persist((set) => ({  // state 对象
    accessToken: null,
    refreshToken: null,
    user: null,
    isLogin: false,
    login: async ({name, password}) => {
      const res = await doLogin({name, password});
      console.log(res, '??????');
      const { access_token, refresh_token, user } = res;
      // console.log(access_token, refresh_token, user);
      set({
        user: user,
        accessToken: access_token,
        refreshToken: refresh_token,
        isLogin: true,
      })
    }
  }), {
    name: 'user-store',
    partialize: (state) => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      user: state.user,
      isLogin: state.isLogin,
    })
  })
)