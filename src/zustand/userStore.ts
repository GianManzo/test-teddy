import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IUser } from '../models/user-DTO';
import { mmkvStorage } from '../storage/mmkvStorage';

interface UserState {
  information: IUser | null;
}

interface UserStore extends UserState {
  setInformation: (information: IUser) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      information: null,
      setInformation: information => set({ information }),
    }),
    {
      name: 'information',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
