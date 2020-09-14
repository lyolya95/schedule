import { tableReducer } from './reducers/table-reducer';
import { combineReducers, createStore } from 'redux';

let reducers = combineReducers({
  eventsData: tableReducer,
});

export const store = createStore(reducers);
