import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import participantsReducer from "./slices/participantsSlice";
import situationTablesReducer from "./slices/situationTablesSlice";
import recordsReducer from "./slices/recordsSlice";
import recordReducer from "./slices/recordSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        participants: participantsReducer,
        situations: situationTablesReducer,
        records: recordsReducer,
        record: recordReducer
    },
});
