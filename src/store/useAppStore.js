import { create } from 'zustand'

const useAppStore = create((set) => ({
  user:      null,
  portfolio: null,
  theme:     'dark',
  setUser:      (user)      => set({ user }),
  setPortfolio: (portfolio) => set({ portfolio }),
  setTheme:     (theme)     => set({ theme }),
}))

export default useAppStore