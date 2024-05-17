import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const loginUser = createAsyncThunk(
    'user/login',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.AUTH, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                if (response.status === 401)
                    throw new Error("Неправильный логин или пароль!");
                if (response.status === 403)
                    throw new Error("Необходимо подтвердить аккаунт через ссылку на почте!");
            }

            response = await response.json();
            dispatch(setAuth(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    email: null,
    accessToken: null,
    isActivate: false
};

const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setAuth(state, action) {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.accessToken = action.payload.accessToken;
                state.isActivate = action.payload.isActivate;

                localStorage.setItem(localStorageKeys.userId, action.payload.id);
                localStorage.setItem(localStorageKeys.email, action.payload.email);
                localStorage.setItem(localStorageKeys.accessToken, action.payload.accessToken);
                localStorage.setItem(localStorageKeys.isActivate, action.payload.isActivate);
            },
            removeAuth(state) {
                state.id = null;
                state.email = null;
                state.accessToken = null;
                state.isActivate = false;

                localStorage.removeItem(localStorageKeys.userId);
                localStorage.removeItem(localStorageKeys.email);
                localStorage.removeItem(localStorageKeys.accessToken);
                localStorage.removeItem(localStorageKeys.isActivate);
            },
        },
        extraReducers: builder => builder
            .addCase(loginUser.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setAuth, removeAuth} = authSlice.actions;

export default authSlice.reducer;
