import { EventOfInterface, MentorInterface } from './../reducers/reducers.model';
import {
  AddDataEventActionInterface,
  ChangeMentorStatusActionInterface,
  SetDataEventsActionInterface,
  SetOrganizersActionInterface,
} from './actions.model';

export const CHANGE_MENTOR_STATUS: string = 'CHANGE_MENTOR_STATUS';
export const SET_DATA_EVENT: string = 'SET_DATA_EVENT';
export const SET_ORGANIZERS: string = 'SET_ORGANIZERS';
export const ADD_DATA_EVENT: string = 'ADD_DATA_EVENT';
export const SET_MODAL_SETTINGS: string = 'SET_MODAL_SETTINGS';
export const SET_MODAL_VIEW_EVENT: string = 'SET_MODAL_VIEW_EVENT';
export const SET_TYPES_COLOR: string = 'SET_TYPES_COLOR';
export const CHANGE_VERSION_VISUALLY: string = 'CHANGE_VERSION_VISUALLY';
export const SET_WIDTH_SCREEN: string = 'SET_WIDTH_SCREEN';
export const SET_TIME_ZONE: string = 'SET_TIME_ZONE';

export const changeMentorStatus = (): ChangeMentorStatusActionInterface => ({ type: CHANGE_MENTOR_STATUS });
export const setDataEventsAC = (events: EventOfInterface[], organizers: MentorInterface[]): SetDataEventsActionInterface => ({
  type: SET_DATA_EVENT,
  events,
  organizers,
});
export const setOrganizersAC = (organizers: MentorInterface[]): SetOrganizersActionInterface => ({
  type: SET_ORGANIZERS,
  organizers,
});

export const addDataEventAC = (): AddDataEventActionInterface => ({ type: ADD_DATA_EVENT });
export const setModalSettings = (value: boolean) => ({ type: SET_MODAL_SETTINGS, value });
export const setColorTypes = (value: any) => ({ type: SET_TYPES_COLOR, value });
export const setModalViewEvent = (value: boolean) => ({ type: SET_MODAL_VIEW_EVENT, value });
export const changeVersionVisually = () => ({ type: CHANGE_VERSION_VISUALLY });
export const setwidthScreenAC = (value: number) => ({ type: SET_WIDTH_SCREEN, value });
export const setTimeZones = (value: any) => ({ type: SET_TIME_ZONE, value });
