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
        // проходимся по данным что бы найти организаторов и поменять их id на соответствующие им имена
        action.organizers.map((mentor: any) => {
          let arrayOfStrings = { id: '', name: '' };
          if (event.organizer) {
            // если пришли данные организатора
            if (event.organizer.indexOf(',') !== -1) {
              // если внутри строки есть запятая (внутри id "Do3SJBnxSjd,DJkd....") это значит что несколько организаторов

              arrayOfStrings.id = event.id;
              arrayOfStrings.name = event.organizer.split(',');
            } else {
              event.organizer === mentor.id && (event.organizer = mentor.name); // если в данных Id совпадает со id ментора тогда переназначить на имя иначе оставить как есть
            }
          }

          //console.log(arrayOfStrings); // id события name id ментаров из этого события

          return mentor;
        });

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
