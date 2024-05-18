import {useSelector} from 'react-redux';

export function useParticipants() {
    const participants = useSelector((state) => state.participants);
    return participants
}
