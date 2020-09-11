export interface StateModel {
  isShowCalendarOrTable: boolean;
}

const initialState: StateModel = {
  isShowCalendarOrTable: false,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'IS_SHOW_CALENDAR':
      return {
        isShowCalendarOrTable: action.payload,
      };
    default:
      return state;
  }
};
