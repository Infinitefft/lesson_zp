import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import type { User } from '../types';

interface UserSate {
  isLoggin: boolean;
  login: (user: {username: string; password: string}) => void;
  logout: () => void;
  user: User | null;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggin: false,
      login: (user) => set({ isLoggin: true, user }),
      logout: () => set({ isLoggin: false, user: null }),
      user: null,
    }),
    {
      name: 'user',
    }
  )
)

export default useUserStore;