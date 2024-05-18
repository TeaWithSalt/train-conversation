import {useSelector} from 'react-redux';

export function useParticipant() {
    const participant = useSelector((state) => state.participant);
    return participant
}
