import { CHANGE_MENTOR_STATUS, setDataEventsAC, SET_DATA_EVENT, setOrganizersAC, SET_ORGANIZERS } from './../actions/index';

import { scheduleAPI } from './../API/api';

export interface StateModel {
  isMentorStatus: boolean;
  data: any;
  columnsName: string[];
  notEditableColumns: string[];
  ratingVotes: number;
  organizers: string[];
  defaultEvent: object;
}
const initialState: StateModel = {
  isMentorStatus: false,
  data: [],
  columnsName: [
    'dateTime',
    'timeZone',
    'timeToComplete',
    'type',
    'name',
    'descriptionUrl',
    'course',
    'organizer',
    'place',
    'week',
    'combineScore',
  ],
  notEditableColumns: ['id', 'combineScore'],
  ratingVotes: 0,
  organizers: [],
  defaultEvent: {
    id: '',
    name: '',
    course: '',
    dateTime: '2020-09-01 00:00',
    type: '',
    timeZone: '+0',
    organizer: '',
    descriptionUrl: '',
    timeToComplete: '1 day',
    place: 'online',
    week: 2,
    maxScore: 100,
    taskContent: '',
    isShowFeedback: false,
  },
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_MENTOR_STATUS:
      return {
        ...state,
        isMentorStatus: !state.isMentorStatus,
      };
    case SET_DATA_EVENT: {
      let ratingVotes = 0;
      action.events.map((event: any) => {
        if (event.organizer) {
          const eventMentorArr = event.organizer.split(',').map((mentorId: string) => {
            const mentor = action.organizers.find((mentor: any) => mentor.id === mentorId);

            return !mentor ? ' ' : mentor.name; // проверка если ввел имя которого нет в манторах тогда в имени вернется пустая строка
          });
          event.organizer = eventMentorArr.join(', ');
        }
        if ((event.score && event.score > 0) || (event.maxScore && event.maxScore > 0)) {
          const score = event.score && event.score > 0 ? event.score : 0;
          const maxScore = event.maxScore && event.maxScore > 0 ? event.maxScore : 0;
          const coefficient = event.coefficient && event.coefficient > 0 ? ', coefficient:' + event.coefficient : '';
          event.combineScore = score + '/' + maxScore + coefficient;
        }
        event.key = event.id;
        if (event.rating && event.rating > 0) {
          ratingVotes++;
        }
        return event;
      });
      return { ...state, data: action.events, ratingVotes: ratingVotes  };
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
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
};
export const getOrganizers = () => async (dispatch: any) => {
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setOrganizersAC(organizers));
};

export const addDataEvent = () => async (dispatch: any) => {
  let newId: string = '';
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789№?_';
  for (let i = 0; i < 20; i++) {
    newId += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  await scheduleAPI.addDataEvent({ ...initialState.defaultEvent, id: newId });
  return newId;
};

export const deleteDataEvent = (idEvent: string) => async (dispatch: any) => {
  await scheduleAPI.deleteDataEvent(idEvent);
};
