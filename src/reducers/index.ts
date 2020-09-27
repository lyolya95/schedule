import { Dispatch } from 'redux';
import { typesTag } from '../components/utilities';
import {
  ADD_DATA_EVENT,
  changeVersionVisually,
  CHANGE_MENTOR_STATUS,
  CHANGE_VERSION_VISUALLY,
  setColorTypes,
  setDataEventsAC,
  setModalSettings,
  setModalViewEvent,
  setOrganizersAC,
  SET_DATA_EVENT,
  SET_MODAL_SETTINGS,
  SET_MODAL_VIEW_EVENT,
  SET_ORGANIZERS,
  SET_TYPES_COLOR,
} from './../actions/index';
import { scheduleAPI } from './../API/api';
import { StateModel } from './reducers.model';

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
  isShowModalViewEvents: false,
  isShowVersionVisually: false,
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
    case CHANGE_VERSION_VISUALLY:
      return {
        ...state,
        isShowVersionVisually: !state.isShowVersionVisually,
      };
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

export const setChangeVersionVisually = () => (dispatch: Dispatch) => {
  dispatch(changeVersionVisually());
};

export { reducer, getDataEvent, putDataEvent, deleteDataEvent, addDataEvent };
