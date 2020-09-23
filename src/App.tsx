import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TableSchedule } from './components/TableSchedule/TableSchedule.container';
import { CalendarItemContainer } from './components/Calendar/CalendarItem.container';
import { ListScheduleContainer } from './components/ListSchedule/ListSchedule.container';
import { HeaderContainer } from './components/Header/Header.container';
import { store } from './store';
import './style.scss';

export const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <HeaderContainer />
          <Switch>
            <Route path="/" component={TableSchedule} exact />
            <Route path="/calendar" component={CalendarItemContainer} />
            <Route path="/list" component={ListScheduleContainer} exact />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
