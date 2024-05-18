import {useSelector} from 'react-redux';

export function useRecord() {
    const record = useSelector((state) => state.record);
    return record
}
