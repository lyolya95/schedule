const REMOVE_ROW_TABLE = 'REMOVE_ROW_TABLE';
const SET_DATA_EVENT = 'SET_DATA_EVENT';

const initialState = {
  data: [],
};

export const tableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DATA_EVENT: {
      return { ...state, data: [...state.data, ...action.data] };
    }
    default:
      return state;
  }
};
export const removeRowTableAC = (id: string) => ({ type: REMOVE_ROW_TABLE, id });
export const setDataEventsAC = (data: any) => ({ type: SET_DATA_EVENT, data });
