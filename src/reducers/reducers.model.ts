export interface EventOfInterface {
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
  combineScore: string;
}
export interface MentorInterface {
  id: string | undefined;
  name: string | undefined;
}
export interface StateModel {
  isMentorStatus: boolean;
  data: EventOfInterface[];
  columnsName: string[];
  notEditableColumns: string[];
  ratingVotes: number;
  organizers: MentorInterface[];
  initialEventData: EventOfInterface;
  isShowSettingsModal: boolean;
  isShowModalViewEvents: boolean;
  types: {
    type: string;
    color: string;
  }[];
  isShowVersionVisually: boolean;
  widthScreen: number;
  timeZone: string;
  isDataLoaded: boolean;
}
