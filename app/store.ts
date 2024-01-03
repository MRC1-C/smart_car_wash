import { create } from 'zustand'

const useStore = create((set) => ({
  time: "00:00:00",
  setTime: (value:any) => set(() => ({ time: value })),
  card_uid: "123",
  setCard: (value:any) => set(() => ({ card_uid: value })),
}))
export default useStore