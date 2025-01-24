import { User } from '@/types/models/profile';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
   user: User | {};
   setUser: (user: User | {}) => void;
}

const useAuth = create(
   persist<AuthStore>(
      set => ({
         user: {},
         setUser: user => {
            set({ user: user });
            // toast.success("Item removed from the cart.");
         },
      }),
      {
         name: 'auth-storage',
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default useAuth;
