import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: { [articleApi.reducerPath]: articleApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});

setupListeners(store.dispatch);

export default store;
