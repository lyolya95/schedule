import { ConfigProvider } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import moment from 'moment';
import 'moment/locale/en-gb';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CalendarItemContainer } from './components/Calendar/CalendarItem.container';
import { HeaderContainer } from './components/Header/Header.container';
import { ListScheduleContainer } from './components/ListSchedule/ListSchedule.container';
import { TableSchedule } from './components/TableSchedule/TableSchedule.container';
import { store } from './store';
import './style.scss';

moment.locale('en-gb');

export const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <HeaderContainer />
          <Switch>
            <Route path="/" component={TableSchedule} exact />
            <ConfigProvider locale={en_GB}>
              <Route path="/calendar" component={CalendarItemContainer} />

              <Route path="/list" component={ListScheduleContainer} exact />
            </ConfigProvider>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
