import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const getRecords = createAsyncThunk(
    'record/getAll',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.RECORD, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem(localStorageKeys.accessToken)
                }
            });

            if (!response.ok) {
                if (response.status === 401)
                    throw new Error("Неправильный логин или пароль!");
            }

            response = await response.json();
            dispatch(setRecords(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    records: []
};

const recordsSlice = createSlice({
        name: 'records',
        initialState: initialState,
        reducers: {
            setRecords(state, action) {
                state.records = action.payload;
            },
            removeRecords(state) {
                state.records = [];
            },
        },
        extraReducers: builder => builder
            .addCase(getRecords.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setRecords, removeRecords} = recordsSlice.actions;

export default recordsSlice.reducer;
