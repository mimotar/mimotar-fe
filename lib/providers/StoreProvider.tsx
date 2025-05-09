"use client";

import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../../lib/services/storeService";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster />
    </Provider>
  );
};
