import { Dispatch } from 'redux';
import { typesTag } from '../components/utilities';
import {
  setColorTypes,
  setDataEventsAC,
  setModalSettings,
  setModalViewEvent,
  setOrganizersAC,
  setwidthScreenAC,
  setTimeZones,
} from './../actions/index';
import { scheduleAPI } from './../API/api';
import { StateModel } from './reducers.model';

const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
const SET_DATA_EVENT = 'SET_DATA_EVENT';
const SET_ORGANIZERS = 'SET_ORGANIZERS';
const ADD_DATA_EVENT = 'ADD_DATA_EVENT';
export const SET_MODAL_SETTINGS: string = 'SET_MODAL_SETTINGS';
export const SET_MODAL_VIEW_EVENT: string = 'SET_MODAL_VIEW_EVENT';
export const SET_TYPES_COLOR: string = 'SET_TYPES_COLOR';
export const SET_WIDTH_SCREEN: string = 'SET_WIDTH_SCREEN';
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
      combineScore: '',
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
    combineScore: '',
  },
  isShowSettingsModal: false,
  types: typesTag,
  isShowModalViewEvents: false,
  widthScreen: 1920,
  timeZone: "+00:00",
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
    case SET_MODAL_VIEW_EVENT: {
      return { ...state, isShowModalViewEvents: action.value };
    }
    case SET_WIDTH_SCREEN: {
      return { ...state, widthScreen: action.value };
    }
    case SET_TIME_ZONE: {
      return {...state, timeZone: action.value};
    }
    default:
      return state;
  }
};

const getDataEvent = () => async (dispatch: Dispatch) => {
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
  dispatch(setOrganizersAC(organizers));
};
const putDataEvent = (idEvent: string, bodyData: object) => async (dispatch: Dispatch) => {
  await scheduleAPI.updateDataEvent(idEvent, bodyData);
  const events = await scheduleAPI.getDataEvents();
  const organizers = await scheduleAPI.getDataOrganizers();
  dispatch(setDataEventsAC(events, organizers));
};
const deleteDataEvent = (idEvent: string) => async (dispatch: Dispatch) => {
  await scheduleAPI.deleteDataEvent(idEvent);
};
const addDataEvent = (newEvent: object) => async (dispatch: Dispatch) => {
  return await scheduleAPI.addDataEvent(newEvent);
};

export const setShowModalSettings = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setModalSettings(value));
};

export const setShowModaViewEvent = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setModalViewEvent(value));
};

export const setColorType = (value: any) => (dispatch: Dispatch) => {
  dispatch(setColorTypes(value));
};

const setWidthScreen = (value: number) => (dispatch: Dispatch) => {
  dispatch(setwidthScreenAC(value));
};

export const setTimeZone = (value: any) => (dispatch: any) => {
  dispatch(setTimeZones(value));
};

export { CHANGE_MENTOR_STATUS, SET_DATA_EVENT, SET_ORGANIZERS, ADD_DATA_EVENT };
export { reducer, getDataEvent, putDataEvent, deleteDataEvent, addDataEvent, setWidthScreen };
