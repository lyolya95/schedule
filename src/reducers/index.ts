import { setDataEventsAC, SET_DATA_EVENT, IS_SHOW_CALENDAR, GET_DATA_ORGANIZERS, setDataOrganizersAC } from './../actions/index';
import { scheduleAPI } from './../API/api';

export interface StateModel {
  isShowCalendarOrTable: boolean;
  data: any;
  organizers: any;
}

const initialState: StateModel = {
  isShowCalendarOrTable: false,
  data: [],
  organizers: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IS_SHOW_CALENDAR:
      return {
        isShowCalendarOrTable: action.payload,
      };
    case SET_DATA_EVENT: {
      return { ...state, data: [...state.data, ...action.payload] };
    }
    case GET_DATA_ORGANIZERS: {
      return { ...state, organizers: [...state.organizers, ...action.payload] };
    }
    default:
      return state;
  }
};

export const getDataEvent = () => async (dispatch: any) => {
  let data = await scheduleAPI.getDataEvents();
  dispatch(setDataEventsAC(data));
};
export const getDataOrganizers = () => async (dispatch: any) => {
  let data = await scheduleAPI.getDataOrganizers();
  dispatch(setDataOrganizersAC(data));
};
