import { configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from '~/redux/activeBoard/activeBoardSlice'
import userReducer from '~/redux/user/userSlice'
import activeCardReducer from '~/redux/activeCard/activeCardSlice'
import notificationsReducer from '~/redux/notifications/notificationsSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})

export default store
