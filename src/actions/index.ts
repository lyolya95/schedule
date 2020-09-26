import {
  ADD_DATA_EVENT,
  CHANGE_MENTOR_STATUS,
  SET_DATA_EVENT,
  SET_MODAL_SETTINGS,
  SET_ORGANIZERS,
  SET_TYPES_COLOR,
} from '../reducers';
import { EventOfInterface, MentorInterface } from './../reducers/reducers.model';
import {
  AddDataEventActionInterface,
  ChangeMentorStatusActionInterface,
  SetDataEventsActionInterface,
  SetOrganizersActionInterface,
} from './actions.model';

const changeMentorStatus = (): ChangeMentorStatusActionInterface => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: EventOfInterface[], organizers: MentorInterface[]): SetDataEventsActionInterface => ({
  type: SET_DATA_EVENT,
  events,
  organizers,
});
const setOrganizersAC = (organizers: MentorInterface[]): SetOrganizersActionInterface => ({
  type: SET_ORGANIZERS,
  organizers,
});
const addDataEventAC = (): AddDataEventActionInterface => ({ type: ADD_DATA_EVENT });
const setModalSettings = (value: boolean) => ({ type: SET_MODAL_SETTINGS, value });
const setColorTypes = (value: any) => ({ type: SET_TYPES_COLOR, value });

export { setModalSettings, setColorTypes, changeMentorStatus, setDataEventsAC, setOrganizersAC, addDataEventAC };
