import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostReguest } from "../../api/cruds"
import { LoginUser, LoginUserResponse, RegisterUser, RegisterUserResponse } from "../../types/User"

interface UserState {
    isSignedIn: boolean,
    user: {
        userName: string,
        email: string,
        token: string
    }
}

const initialState: UserState = {
    isSignedIn: false,
    user: {
        userName: '',
        email: '',
        token: ''
    }
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUserAsync.fulfilled, (state) => {
            return state
        }),
        builder.addCase(loginUserAsync.fulfilled, (state, action) => {
            state.isSignedIn = true;
            state.user = {
                userName: action.payload.userName,
                email: action.payload.email,
                token: action.payload.token
            }
        })
    },
})

export const registerUserAsync = createAsyncThunk("user/registerUserAsync", 
    async (userData: RegisterUser) => {
        try {
            const res = await PostReguest<RegisterUserResponse>('/account/register', userData);
            return res;
        }
        catch {
            throw new Error('Unsuccessfull registation');
        }
        
    }
)

export const loginUserAsync = createAsyncThunk("user/loginUserAsync", 
    async(userData: LoginUser) => {
        try {
            const res = await PostReguest<LoginUserResponse>('/account/login', userData);
            return res;
        }
        catch {
            throw new Error('Unsuccessfull registation');
        }
    }
)

export const { logout } = userSlice.actions;
export default userSlice.reducer;