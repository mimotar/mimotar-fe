import { configureStore } from "@reduxjs/toolkit";
import {
  createTransform,
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
// import createTransactionProcessDataSlice from "../slices/createTransactionProcessDataSlice";
import createTransactionSlice from "../slices/createTransactionslice";
import TicketSuccessSlice from "../slices/TicketSuccessSlice";
import { normalizeAttachments } from "@/app/utils/attachmentStorage";

const createTransactionTransform = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    attachment: normalizeAttachments(inboundState?.attachment),
  }),
  (outboundState: any) => ({
    ...outboundState,
    attachment: normalizeAttachments(outboundState?.attachment),
  }),
  { whitelist: ["createTransaction"] },
);

const persistConfig = {
  key: "root",
  storage: storageService,
  transforms: [createTransactionTransform],
  whitelist: [
    "leftPanelVisibility",
    "customerCount",
    "createTransactionStateModal",
    // "createTransactionProcessData",
    "createTransaction",
    "TicketSuccessPayload",
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
  createTransactionStateModal: createTransactionStateSlice,
  // createTransactionProcessData: createTransactionProcessDataSlice,
  createTransaction: createTransactionSlice,
  TicketSuccessPayload: TicketSuccessSlice,
});

const persistedReducer = persistReducer(
  persistConfig as any,
  rootReducer as any,
) as unknown as typeof rootReducer;

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
