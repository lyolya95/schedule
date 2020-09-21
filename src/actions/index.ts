export const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';
export const SET_ORGANIZERS = 'SET_ORGANIZERS';

const changeMentorStatus = () => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });
const setOrganizersAC = (organizers: any) => ({ type: SET_ORGANIZERS, organizers });

export { changeMentorStatus };
export { setDataEventsAC };
export { setOrganizersAC };
