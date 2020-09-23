import { ADD_DATA_EVENT, CHANGE_MENTOR_STATUS, SET_DATA_EVENT, SET_MODAL_SETTINGS, SET_ORGANIZERS } from '../reducers';

const changeMentorStatus = () => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: any, organizers: any) => ({ type: SET_DATA_EVENT, events, organizers });
const setOrganizersAC = (organizers: any) => ({ type: SET_ORGANIZERS, organizers });
const addDataEventAC = () => ({ type: ADD_DATA_EVENT });
const setModalSettings = (value: boolean) => ({ type: SET_MODAL_SETTINGS, value });

export { changeMentorStatus };
export { setDataEventsAC };
export { setOrganizersAC };
export { addDataEventAC };
export { setModalSettings };
