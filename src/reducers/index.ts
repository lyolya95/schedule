import {
  CHANGE_MENTOR_STATUS,
  putDataEventAC,
  setDataEventsAC,
  SET_DATA_EVENT,
  PUT_DATA_EVENT,
  setOrganizersAC,
  SET_ORGANIZERS,
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
  isMentorStatus: boolean;
  data: any;
  columnsName: string[];
  organizers: string[];
}
const initialState: StateModel = {
  isMentorStatus: false,
  data: [],
  columnsName: [
    'id',
    'name',
    'course',
    'dateTime',
    //'type',   /* удалил так как возникают тогда две колонки с type из-за добавления в TableSchedule.tsx после строчки с "...props.columnsName," */
    'timeZone',
    'organizer',
    'descriptionUrl',
    'timeToComplete',
    'place',
    'week',
    'maxScore',
    'taskContent',
    'isShowFeedback',
  ],
  organizers: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_MENTOR_STATUS:
      return {
        ...state,
        isMentorStatus: !state.isMentorStatus,
      };
    case SET_DATA_EVENT: {
      action.events.map((event: any) => {
        if (event.organizer) {
          const eventMentorArr = event.organizer.split(',').map((mentorId: string) => {
            const mentor = action.organizers.find((mentor: any) => mentor.id === mentorId);

            return !mentor ? ' ' : mentor.name; // проверка если ввел имя которого нет в манторах тогда в имени вернется пустая строка
          });
          event.organizer = eventMentorArr.join(', ');
        }
        return event;
      });

      return { ...state, data: [...action.events] };
    }
    case PUT_DATA_EVENT: {
      return { ...state };
    }
    case SET_ORGANIZERS: {
      return { ...state, organizers: [...action.organizers] };
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
export const putDataEvent = (idEvent: string, bodyData: object) => async (dispatch: any) => {
  await scheduleAPI.updateDataEvent(idEvent, bodyData);
  dispatch(putDataEventAC(idEvent, bodyData));
};
export const getOrganizers = () => async (dispatch: any) => {
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setOrganizersAC(organizers));
};
