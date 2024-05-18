import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";

export const getParticipants = createAsyncThunk(
    'participant/getAll',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.PARTICIPANT, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                if (response.status === 401)
                    throw new Error("Неправильный логин или пароль!");
            }

            response = await response.json();
            dispatch(setParticipants(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    roles: [],
    participants: []
};

const participantsSlice = createSlice({
        name: 'participants',
        initialState: initialState,
        reducers: {
            setParticipants(state, action) {
                state.roles = action.payload;
                state.participants = action.payload.map(role => role.participants).flat(1);
            },
            removeParticipants(state) {
                state.roles = [];
                state.participants = [];
            },
        },
        extraReducers: builder => builder
            .addCase(getParticipants.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setParticipants, removeParticipants} = participantsSlice.actions;

export default participantsSlice.reducer;
