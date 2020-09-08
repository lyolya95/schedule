import React from 'react';
import { CalendarItem } from './components/Calendar/CalendarItem';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <CalendarItem />
    </div>
  );
};
