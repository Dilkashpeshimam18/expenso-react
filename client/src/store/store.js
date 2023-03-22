import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth-slice'
import expenseReducer from './slice/expense-slice'
import themeReducer from "./slice/theme-slice";
import modalReducer from './slice/modal-slice'
import dashboardReducer from './slice/dashboard-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        theme: themeReducer,
        modal: modalReducer,
        dashboard: dashboardReducer
    }
})

export default store