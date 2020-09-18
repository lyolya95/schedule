export const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';
export const PUT_DATA_EVENT = 'PUT_DATA_EVENT';

const changeMentorStatus = () => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });
const putDataEventAC = (idEvent: string, bodyData: object) => ({ type: PUT_DATA_EVENT, idEvent, bodyData });

export { changeMentorStatus };
export { setDataEventsAC };
export { putDataEventAC };
