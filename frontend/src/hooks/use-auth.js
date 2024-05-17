import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../store/slices/authSlice';
import {localStorageKeys} from "../core/models/localStorageKeys";

export function useAuth() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const localUser = {
        id: localStorage.getItem(localStorageKeys.userId),
        email: localStorage.getItem(localStorageKeys.email),
        accessToken: localStorage.getItem(localStorageKeys.accessToken),
        isActivate: localStorage.getItem(localStorageKeys.isActivate) === "true" || false,
    };

    if (localUser.email && localUser.id) {
        dispatch(setAuth(localUser));
        return {
            isAuth: !!localUser.id,
            ...localUser,
        };
    }

    return {
        isAuth: !!auth.id,
        ...auth,
    };
}
