import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const getSituations = createAsyncThunk(
    'situationTables/getAll',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.SITUATION_TABLE, {
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
            dispatch(setSituations(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    situations: []
};

const situationTablesSlice = createSlice({
        name: 'situationTables',
        initialState: initialState,
        reducers: {
            setSituations(state, action) {
                state.situations = action.payload;
            },
            removeSituations(state) {
                state.situations = [];
            },
        },
        extraReducers: builder => builder
            .addCase(getSituations.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setSituations, removeSituations} = situationTablesSlice.actions;

export default situationTablesSlice.reducer;
