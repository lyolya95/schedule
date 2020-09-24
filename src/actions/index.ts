import {
  ChangeMentorStatusActionInterface,
  SetDataEventsActionInterface,
  AddDataEventActionInterface,
  SetOrganizersActionInterface,
} from './actions.model';
import { EventOfInterface, MentorInterface } from './../reducers/reducers.model';
import { CHANGE_MENTOR_STATUS, SET_DATA_EVENT, SET_ORGANIZERS, ADD_DATA_EVENT } from '../reducers';

const changeMentorStatus = (): ChangeMentorStatusActionInterface => ({ type: CHANGE_MENTOR_STATUS });
const setDataEventsAC = (events: EventOfInterface[], organizers: MentorInterface[]): SetDataEventsActionInterface => ({
  type: SET_DATA_EVENT,
  events,
  organizers,
});
const setOrganizersAC = (organizers: MentorInterface[]): SetOrganizersActionInterface => ({ type: SET_ORGANIZERS, organizers });
const addDataEventAC = (): AddDataEventActionInterface => ({ type: ADD_DATA_EVENT });

export { changeMentorStatus, setDataEventsAC, setOrganizersAC, addDataEventAC };
