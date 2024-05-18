import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";


export const getUserProfile = createAsyncThunk(
    'user',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.USER, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem(localStorageKeys.accessToken)
                }
            });

            if (!response.ok) {
                if(response.status === 404)
                    throw new Error("Пользователь не найден!");
            }

            response = await response.json();
            dispatch(setUser(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    email: null,
    firstName: null,
    secondName: null,
    avatarSrc: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.secondName = action.payload.secondName;
            state.avatarSrc = action.payload.avatarSrc;
        },
        removeUser(state) {
            state.id = null;
            state.email = null;
            state.firstName = null;
            state.secondName = null;
            state.avatarSrc = null;
        },
    },
    extraReducers: builder => builder
        .addCase(getUserProfile.rejected, (state, action) => {
            throw new Error(action.payload);
        })
})
;

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
