import { IS_SHOW_CALENDAR, setDataEventsAC, SET_DATA_EVENT } from './../actions/index';
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
}
const initialState: StateModel = {
  isShowCalendarOrTable: false,
  data: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IS_SHOW_CALENDAR:
      return {
        ...state,
        isShowCalendarOrTable: action.payload,
      };
    case SET_DATA_EVENT: {
      action.events.map((event: any) => {
        if (event.organizer) {
          const eventMentorArr = event.organizer.split(',').map((mentorId: string) => {
            const mentor = action.organizers.find((mentor: any) => mentor.id === mentorId);
            return mentor.name;
          });
          event.organizer = eventMentorArr.join(', ');
        }
        return event;
      });

      return { ...state, data: [...action.events] };
    }
    default:
      return state;
  }
};

export const getDataEvent = () => async (dispatch: any) => {
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
};
