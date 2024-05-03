import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasksSlice";

const store = configureStore({
    reducer: {
        task: tasksSlice
    },
})

export default store;