import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WatchlistModel } from '../models/watchlistModel' 
import { SecuritiesModel } from '../models/securitiesModel' 

type WatchlistStore = {
  watchlists: WatchlistModel[]
  activeWatchlistId: string | null

  createWatchlist: (name: string) => void
  setActiveWatchlist: (id: string) => void
  renameWatchlist: (id: string, name: string) => void
  deleteWatchlist: (id: string) => void

  addSecurity: (watchlistId: string, security: SecuritiesModel) => void
  removeSecurity: (watchlistId: string, symbol: string) => void
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlists: [],
      activeWatchlistId: null,

      createWatchlist: (name) => {
        if (get().watchlists.length >= 10) return

        const id = crypto.randomUUID()

        set({
          watchlists: [
            ...get().watchlists,
            new WatchlistModel(id, name),
          ],
          activeWatchlistId: id,
        })
      },

      setActiveWatchlist: (id) =>
        set({ activeWatchlistId: id }),

      renameWatchlist: (id, name) =>
        set({
            watchlists: get().watchlists.map(w =>
            w.id === id
                ? new WatchlistModel(w.id, name, w.securities)
                : w
            ),
        }),


      deleteWatchlist: (id) =>
        set({
          watchlists: get().watchlists.filter(w => w.id !== id),
          activeWatchlistId: null,
        }),

     addSecurity: (watchlistId, security) =>
        set({
            watchlists: get().watchlists.map(w =>
            w.id === watchlistId &&
            w.securities.length < 50 &&
            !w.securities.some(s => s.symbol === security.symbol)
                ? new WatchlistModel(
                    w.id,
                    w.name,
                    [...w.securities, security]
                )
                : w
            ),
        }),


      removeSecurity: (watchlistId, symbol) =>
  set({
    watchlists: get().watchlists.map(w =>
      w.id === watchlistId
        ? new WatchlistModel(
            w.id,
            w.name,
            w.securities.filter(s => s.symbol !== symbol)
          )
        : w
    ),
  }),

    }),
    {
      name: 'watchlist-storage',
      partialize: (state) => ({
        watchlists: state.watchlists.map(w => w.toJSON()),
        activeWatchlistId: state.activeWatchlistId,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.watchlists = state.watchlists.map(w =>
          WatchlistModel.fromJSON(w)
        )
      },
    }
  )
)
