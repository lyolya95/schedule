import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CalendarItemContainer } from './components/Calendar/CalendarItem.container';
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
            {/* <Route path="/" component={КомпонентТаблицы} exact /> */}
            <Route path="/calendar" component={CalendarItemContainer} />
            {/* <Route path="/list" component={КомпонентСписка} exact /> */}
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
