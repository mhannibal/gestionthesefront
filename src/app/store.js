import { configureStore } from '@reduxjs/toolkit'
import { tmsApi } from '../service'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmsApi.reducerPath]: tmsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmsApi.middleware),
})
