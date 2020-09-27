export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: any;
  index: number;
  children: React.ReactNode;
  organizers: any;
  types: {
    type: string;
    color: string;
  }[];
  timeZone: string;
}
export interface IAgeMap {
  [keys: string]: string | boolean | object;
}
