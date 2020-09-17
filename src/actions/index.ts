export const IS_SHOW_CALENDAR = 'IS_SHOW_CALENDAR';
export const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';

const isShowCalendar = (action: any) => ({ type: IS_SHOW_CALENDAR, payload: action });
const changeMentorStatus = () => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });

export { isShowCalendar };
export { changeMentorStatus };
export { setDataEventsAC };
