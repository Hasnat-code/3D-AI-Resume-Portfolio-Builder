import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      authModal: false,
      authMode: 'signup',
      openAuth:  (mode = 'signup') => set({ authModal: true, authMode: mode }),
      closeAuth: () => set({ authModal: false }),
      toggleAuthMode: () => set((s) => ({ authMode: s.authMode === 'signup' ? 'login' : 'signup' })),

      activeTab: 'overview',
      setTab: (tab) => set({ activeTab: tab }),

      resumeData: {
        name:'', title:'', email:'', phone:'', location:'', bio:'',
        skills:[], experience:[], education:[], projects:[],
      },
      setResume: (d) => set((s) => ({ resumeData: { ...s.resumeData, ...d } })),
    }),
    { name: 'nexfolio', partialize: (s) => ({ resumeData: s.resumeData, activeTab: s.activeTab }) }
  )
)
