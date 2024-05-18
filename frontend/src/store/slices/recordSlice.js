import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const getRecord = createAsyncThunk(
    'record/get',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.RECORD + "/" + id, {
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
            console.log(response)
            dispatch(setRecord(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    record: null
};

const recordSlice = createSlice({
        name: 'record',
        initialState: initialState,
        reducers: {
            setRecord(state, action) {
                state.record = action.payload;
            },
            removeRecord(state) {
                state.record = null;
            },
        },
        extraReducers: builder => builder
            .addCase(getRecord.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setRecord, removeRecord} = recordSlice.actions;

export default recordSlice.reducer;
