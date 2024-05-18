import {useSelector} from 'react-redux';

export function useRecords() {
    const records = useSelector((state) => state.records);
    return records
}
