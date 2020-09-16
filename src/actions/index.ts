export const IS_SHOW_CALENDAR = 'IS_SHOW_CALENDAR';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';
export const GET_DATA_ORGANIZERS = 'GET_DATA_ORGANIZERS';

const isShowCalendar = (action: any) => ({ type: IS_SHOW_CALENDAR, payload: action });
const setDataEventsAC = (action: any) => ({ type: SET_DATA_EVENT, payload: action });
const setDataOrganizersAC = (action: any) => ({ type: GET_DATA_ORGANIZERS, payload: action });

export { isShowCalendar };
export { setDataEventsAC };
export { setDataOrganizersAC };
