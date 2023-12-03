import { createSlice } from "@reduxjs/toolkit";
import userManager from "../../userManager";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.status = true
            //rest api den gelen veriye göre değiştirebilir.
            let { username, user_id, access_token } = action.payload;
            state.user = {
                name: username,
                role: 'customer',
                email: username,
                user_id: user_id,
                access_token: access_token
            }
        },
        register: (state, action) => {
            console.log(action.payload);
            let { name, email, pass } = action.payload;
            state.status = true
            state.user = {
                name: name,
                role: 'customer',
                email: email,
                pass: pass
            }
        },
        logout: (state) => {
            console.log("user slice logouta gelindi");
            state.status = false
            state.user = {

            }
        }
    }
})

const userReducer = userSlice.reducer
export default userReducer