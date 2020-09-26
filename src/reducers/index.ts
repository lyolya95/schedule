import { typesTag } from '../components/utilities';
import { setColorTypes, setDataEventsAC, setModalSettings, setOrganizersAC, setTimeZones } from './../actions/index';
import { scheduleAPI } from './../API/api';
import { StateModel } from './reducers.model';

const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
const SET_DATA_EVENT = 'SET_DATA_EVENT';
const SET_ORGANIZERS = 'SET_ORGANIZERS';
const ADD_DATA_EVENT = 'ADD_DATA_EVENT';
export const SET_MODAL_SETTINGS: string = 'SET_MODAL_SETTINGS';
export const SET_TYPES_COLOR: string = 'SET_TYPES_COLOR';
export const SET_TIME_ZONE: string = 'SET_TIME_ZONE';

const initialState: StateModel = {
  isMentorStatus: false,
  data: [
    {
      course: '',
      dateTime: '',
      descriptionUrl: '',
      isShowFeedback: '',
      maxScore: '',
      name: '',
      organizer: undefined,
      place: '',
      rating: '',
      studentScore: '',
      taskContent: '',
      timeToComplete: '',
      timeZone: '',
      type: '',
      week: '',
    },
  ],
  columnsName: [
    'dateTime',
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
  initialEventData: {
    course: '',
    dateTime: '',
    descriptionUrl: '',
    isShowFeedback: '',
    maxScore: '',
    name: '',
    organizer: undefined,
    place: '',
    rating: '',
    studentScore: '',
    taskContent: '',
    timeToComplete: '',
    timeZone: '',
    type: '',
    week: '',
  },
  isShowSettingsModal: false,
  types: typesTag,
  timeZone: "+00:00"
};

const reducer = (state = initialState, action: any): StateModel => {
  switch (action.type) {
    case CHANGE_MENTOR_STATUS:
      return {
        ...state,
        isMentorStatus: !state.isMentorStatus,
      };
    case SET_DATA_EVENT: {
      let ratingVotes: number = 0;
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
        if (event.rating && event.rating > 0) {
          ratingVotes++;
        }
        return event;
      });
      return { ...state, data: action.events, ratingVotes: ratingVotes };
    }
    case SET_ORGANIZERS: {
      return { ...state, organizers: [...action.organizers] };
    }
    case ADD_DATA_EVENT: {
      return state;
    }
    case SET_MODAL_SETTINGS: {
      return { ...state, isShowSettingsModal: action.value };
    }
    case SET_TYPES_COLOR: {
      return { ...state, types: action.value };
    }
    case SET_TIME_ZONE: {
      return {...state, timeZone: action.value}
    }
    default:
      return state;
  }
};

const getDataEvent = () => async (dispatch: any) => {
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
  dispatch(setOrganizersAC(organizers));
};
const putDataEvent = (idEvent: string, bodyData: object) => async (dispatch: any) => {
  await scheduleAPI.updateDataEvent(idEvent, bodyData);
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
};
const deleteDataEvent = (idEvent: string) => async (dispatch: any) => {
  await scheduleAPI.deleteDataEvent(idEvent);
};
const addDataEvent = (newEvent: object) => async (dispatch: any) => {
  return await scheduleAPI.addDataEvent(newEvent);
};

export const setShowModalSettings = (value: boolean) => (dispatch: any) => {
  dispatch(setModalSettings(value));
};

export const setColorType = (value: any) => (dispatch: any) => {
  dispatch(setColorTypes(value));
};

export const setTimeZone = (value: any) => (dispatch: any) => {
  dispatch(setTimeZones(value));
};
export { CHANGE_MENTOR_STATUS, SET_DATA_EVENT, SET_ORGANIZERS, ADD_DATA_EVENT };
export { reducer, getDataEvent, putDataEvent, deleteDataEvent, addDataEvent };
