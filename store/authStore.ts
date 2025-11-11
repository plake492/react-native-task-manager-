import { create } from 'zustand';
import { User } from '@/types';

export const useAuthtore = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  signOutUser: () => set({ user: null })
}));
