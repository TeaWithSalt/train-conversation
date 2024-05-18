import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const getParticipant = createAsyncThunk(
    'participant/getA',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.PARTICIPANT+'/'+id, {
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
            dispatch(setParticipant(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    participant: null,
    isLoading: false,
};

const participantSlice = createSlice({
        name: 'participant',
        initialState: initialState,
        reducers: {
            setParticipant(state, action) {
                state.participant = action.payload
                state.isLoading = false
            },
            removeParticipants(state) {
                state.participant = null
                state.isLoading = false
            },
        },
        extraReducers: builder => builder
            .addCase(getParticipant.rejected, (state, action) => {
                state.isLoading = false
                throw new Error(action.payload);
            })
            .addCase(getParticipant.pending, (state, action) => {
                state.isLoading = true
                state.participant = null
            })
    })
;

export const {setParticipant, removeParticipant} = participantSlice.actions;

export default participantSlice.reducer;
