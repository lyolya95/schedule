export const IS_SHOW_CALENDAR = 'IS_SHOW_CALENDAR';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';

const isShowCalendar = (action: any) => ({ type: IS_SHOW_CALENDAR, payload: action });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });

export { isShowCalendar };
export { setDataEventsAC };
