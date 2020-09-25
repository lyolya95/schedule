import { types } from '../components/utilities/switcher';
import { setColorTypes, setDataEventsAC, setModalSettings, setOrganizersAC } from './../actions/index';
import { scheduleAPI } from './../API/api';

export const CHANGE_MENTOR_STATUS = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT = 'SET_DATA_EVENT';
export const SET_ORGANIZERS = 'SET_ORGANIZERS';
export const ADD_DATA_EVENT = 'ADD_DATA_EVENT';
export const SET_MODAL_SETTINGS: string = 'SET_MODAL_SETTINGS';
export const SET_TYPES_COLOR: string = 'SET_TYPES_COLOR';

export interface IEvent {
  id?: string;
  name: string;
  course: string;
  dateTime: string;
  type: string;
  timeZone: string;
  organizer: string | undefined;
  descriptionUrl: string;
  timeToComplete: string;
  place: string;
  week: string;
  studentScore: string;
  maxScore: string;
  taskContent: string;
  isShowFeedback: string;
  rating: string;
}
export interface StateModel {
  isMentorStatus: boolean;
  data: any;
  columnsName: string[];
  notEditableColumns: string[];
  ratingVotes: number;
  organizers: string[];
  initialEventData: IEvent;
  isShowSettingsModal: boolean;
  types: {
    type: string;
    color: string;
  }[];
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
  types: types,
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
        //event.key = event.id;
        if (event.rating && event.rating > 0) {
          ratingVotes++;
        }
        return event;
      });
      return { ...state, data: action.events };
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
export const deleteDataEvent = (idEvent: string) => async (dispatch: any) => {
  await scheduleAPI.deleteDataEvent(idEvent);
};
export const addDataEvent = (newEvent: any) => async (dispatch: any) => {
  return await scheduleAPI.addDataEvent(newEvent);
};

export const setShowModalSettings = (value: boolean) => (dispatch: any) => {
  dispatch(setModalSettings(value));
};

export const setColorType = (value: any) => (dispatch: any) => {
  dispatch(setColorTypes(value));
};
