import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { getDefaultConfig } from "tailwind-merge";




export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            mainApi.middleware,
        ]),
});