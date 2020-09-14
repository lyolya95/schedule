const IS_SHOW_CALENDAR = 'IS_SHOW_CALENDAR';

const isShowCalendar = (action: any) => {
  return {
    type: IS_SHOW_CALENDAR,
    payload: action,
  };
};
export { isShowCalendar };
