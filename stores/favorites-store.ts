import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  dateAdded: string
}

interface FavoritesStore {
  items: FavoriteItem[]
  addItem: (item: Omit<FavoriteItem, 'dateAdded'>) => void
  removeItem: (id: number) => void
  toggleItem: (item: Omit<FavoriteItem, 'dateAdded'>) => void
  isFavorite: (id: number) => boolean
  clearFavorites: () => void
  getTotalItems: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const items = get().items
        const exists = items.find(item => item.id === newItem.id)
        
        if (!exists) {
          set({
            items: [...items, { ...newItem, dateAdded: new Date().toISOString() }]
          })
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
      },
      
      toggleItem: (item) => {
        const items = get().items
        const exists = items.find(existingItem => existingItem.id === item.id)
        
        if (exists) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },
      
      isFavorite: (id) => {
        return get().items.some(item => item.id === id)
      },
      
      clearFavorites: () => {
        set({ items: [] })
      },
      
      getTotalItems: () => {
        return get().items.length
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)