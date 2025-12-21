import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSilce"
import itemsReducer from "./slices/itemsSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        items: itemsReducer,
    }
})
export default store