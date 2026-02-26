import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../redux/userSlice.js";
import cartReducer from "../redux/cartSlice.js"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistConfig = {
    key: 'cart',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//persisted way to create store 
export const store = configureStore({
    reducer: persistedReducer,



    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export const persistor = persistStore(store);




