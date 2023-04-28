import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { expenseActions } from "./expense-slice";
const initialIncomeState = {
    userIncome: localStorage.getItem('userIncome') ||0,
    userExpenses: localStorage.getItem('userExpenses') || 0,
    userBalance: localStorage.getItem('userBalance') || 0
}

const IncomeSlice = createSlice({
    name: 'income',
    initialState: initialIncomeState,
    reducers: {
        handlAddDetails(state, action) {
            state.userIncome = action.payload.total_income
            state.userExpenses = action.payload.total_expense
            state.userBalance = action.payload.remaining_balance
        }
    }
})


export const addIncome = (income) => {
    return async (state) => {
        const addInc = async () => {

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            console.log('IN ADD INCOME')
            console.log('INCOME>>>', income)
            const data = {
                income: income
            }

            let response = await reqInstance.post('http://localhost:4000/income/add-income', data)
            console.log(response)
        }
        try {
            await addInc()
        } catch (err) {
            console.log(err)
        }

    }
}

export const getUserIncome = () => {
    return async (state, dispatch) => {
        const getIncome = async () => {

            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            let response = await reqInstance.get('http://localhost:4000/income/get-userDetail')
            console.log(response)
            let data = response.data.message
            const details = {
                total_income: data.total_income,
                total_expense: data.total_expense,
                remaining_balance: data.remaining_balance
            }
            dispatch(incomeAction.handlAddDetails(details))
            localStorage.setItem('userIncome',data.total_income)
            localStorage.setItem('userExpenses',data.total_expense)
            localStorage.setItem('userBalance',data.remaining_balance)
            // let res = response.data
            // if (res == null) {
            //     localStorage.setItem('userIncome', 0)
            //     dispatch(addIncome(0))
            // } else {
            //     let data = {}
            //     for (let key in res) {
            //         res = {
            //             id: key,
            //             income: res[key]
            //         }
            //     }

            //     localStorage.setItem('userIncome', JSON.stringify(res))
            //     dispatch(addIncome(res.income))
            // }

        }

        try {
            await getIncome()

        } catch (err) {
            console.log(err)
        }
    }
}

export const updateUserIncome = (data) => {
    return async (dispatch) => {
        const updateIncome = async () => {
            let response;
            var email = localStorage.getItem('email')
            let usermail;
            if (email != null) {
                var splitted = email?.split("@");
                usermail = splitted[0]?.replace(/\./g, "");
            }
            if (email != null) {
                response = await axios.put(`https://clone-e78d9-default-rtdb.firebaseio.com/income/${usermail}/${data.id}.json`, data.income)
                localStorage.setItem('userIncome', JSON.stringify(data))

                dispatch(expenseActions.handleAddIncome(data))

            } else {
                response = await axios.put('https://clone-e78d9-default-rtdb.firebaseio.com/income.json', data.income)

            }
        }

        try {
            await updateIncome().then(() => {
                getUserIncome()
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const incomeAction = IncomeSlice.actions
export default IncomeSlice.reducer
