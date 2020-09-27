import { ADD_DATA_EVENT, CHANGE_MENTOR_STATUS, SET_DATA_EVENT, SET_ORGANIZERS } from '.';
import { EventOfInterface, MentorInterface } from './../reducers/reducers.model';

export interface ChangeMentorStatusActionInterface {
  type: typeof CHANGE_MENTOR_STATUS;
}
export interface SetDataEventsActionInterface {
  type: typeof SET_DATA_EVENT;
  events: EventOfInterface[];
  organizers: MentorInterface[];
}
export interface SetOrganizersActionInterface {
  type: typeof SET_ORGANIZERS;
  organizers: MentorInterface[];
}
export interface AddDataEventActionInterface {
  type: typeof ADD_DATA_EVENT;
}
