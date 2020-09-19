import { CHANGE_MENTOR_STATUS, setDataEventsAC, SET_DATA_EVENT } from './../actions/index';
import { scheduleAPI } from './../API/api';

export interface StateModel {
  isMentorStatus: boolean;
  data: any;
  columnsName: string[];
  notEditableColumns: string[];
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
  notEditableColumns: [
    'id',
    'combineScore'
  ],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_MENTOR_STATUS:
      return {
        ...state,
        isMentorStatus: !state.isMentorStatus,
      };
    case SET_DATA_EVENT: {
      action.events.map((event: any) => {
        if (event.organizer) {
          const eventMentorArr = event.organizer.split(',').map((mentorId: string) => {
            const mentor = action.organizers.find((mentor: any) => mentor.id === mentorId);
            const mentorName =  mentor=== undefined ? mentorId : mentor.name;
            return mentorName;
          });
          event.organizer = eventMentorArr.join(', ');
        }
        if((event.score && event.score>0) || (event.maxScore && event.maxScore>0)){
          const score = event.score && event.score>0 ? event.score : 0;
          const maxScore = event.maxScore && event.maxScore>0 ? event.maxScore : 0;
          const coefficient = event.coefficient && event.coefficient>0 ? ', coefficient:'+event.coefficient : '';
          event.combineScore =  score+'/'+maxScore+coefficient;
        }
        event.key = event.id;
        return event;
      });
      return { ...state, data: [...action.events] };
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
