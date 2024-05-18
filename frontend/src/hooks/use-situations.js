import {useSelector} from 'react-redux';

export function useSituations() {
    const situations = useSelector((state) => state.situations);
    return situations
}
