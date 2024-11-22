import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import { storageService } from "./storageService";
import userSlice from "../slices/userSlice";
import createTransactionStateSlice from "../slices/createTransactionStateSlice";
import createTransactionProcessDataSlice from "../slices/createTransactionProcessDataSlice";

const persistConfig = {
  key: "root",
  storage: storageService,
  whitelist: [
    "leftPanelVisibility",
    "customerCount",
    "createTransactionStateModal",
    "createTransactionProcessData",
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
  createTransactionStateModal: createTransactionStateSlice,
  createTransactionProcessData: createTransactionProcessDataSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
