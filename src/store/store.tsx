import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import HistoryReducer from "./reducers/HistoryReducer";
import PresentReducer from "./reducers/PresentReducer";

const mainReducer = combineReducers({
    PresentReducer,
    HistoryReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: mainReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
}

export type MainState = ReturnType<typeof mainReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<MainState> = useSelector