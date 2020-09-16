import {
  GET_DATA_ORGANIZERS,
  IS_SHOW_CALENDAR,
  setDataEventsAC,
  setDataOrganizersAC,
  SET_DATA_EVENT,
} from './../actions/index';
import { scheduleAPI } from './../API/api';

// export interface StateModel {
//   isShowCalendarOrTable: boolean;
//   data: [
//     {
//       id: string;
//       name: string;
//       course: string;
//       dateTime: string;
//       type: string;
//       timeZone: string;

//       organizer?: string;
//       descriptionUrl?: string;
//       timeToComplete?: string;
//       place?: string;
//       week?: number;
//       maxScore?: number;
//       taskContent?: string;
//       isShowFeedback?: boolean;
//     }
//   ];
//   organizers: any;
// }
// const initialState: StateModel = {
//   isShowCalendarOrTable: false,
//   data: [
//     {
//       id: '',
//       name: '',
//       course: '',
//       dateTime: '',
//       type: '',
//       timeZone: '',
//     },
//   ],
//   organizers: [],
// };

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
        ...state,
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
  const data = await scheduleAPI.getDataEvents();
  dispatch(setDataEventsAC(data));
};
export const getDataOrganizers = () => async (dispatch: any) => {
  const data = await scheduleAPI.getDataOrganizers();
  dispatch(setDataOrganizersAC(data));
};
