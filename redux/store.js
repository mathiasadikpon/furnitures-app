import { configureStore } from "@reduxjs/toolkit";
import { furnituresReducer } from "../features/furnitures/furnituresSlice";
import { favoritesReducer } from "../features/favorites/favoritesSlice";

import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mensShirtsReducer } from "../features/mens-shirts/mensShirtsSlice";
import { mensShoesReducer } from "../features/mens-shoes/mensShoesSlice";
import { womensDressesReducer } from "../features/womens-dresses/womensDressesSlice";
import { womensShoesReducer } from "../features/womens-shoes/womensShoesSlice";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const store = configureStore({
  reducer: persistCombineReducers(config, {
    // Add your reducers here
    furnitures: furnituresReducer,
    favorites: favoritesReducer,
    mensShirts: mensShirtsReducer,
    womensDresses: womensDressesReducer,
    womensShoes: womensShoesReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
