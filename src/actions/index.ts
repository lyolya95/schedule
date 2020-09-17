export const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';

const changeMentorStatus = () => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });

export { changeMentorStatus };
export { setDataEventsAC };
