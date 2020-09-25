export interface CalendarItemProps {
  data: any;
  getDataEvent: () => void;
  types: {
    type: string;
    color: string;
  }[];
}
