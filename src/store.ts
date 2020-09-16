import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers/index';

const reducers = combineReducers({
  reducer,
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));
