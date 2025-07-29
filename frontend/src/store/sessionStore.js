import { create } from 'zustand';

const useSessionStore = create((set) => ({
  chat: [],
  jsxCode: '',
  cssCode: '',
  updateChat: (message) =>
    set((state) => ({ chat: [...state.chat, message] })),
  setCode: (jsx, css) => set({ jsxCode: jsx, cssCode: css }),
  reset: () => set({ chat: [], jsxCode: '', cssCode: '' })
}));

export default useSessionStore;
