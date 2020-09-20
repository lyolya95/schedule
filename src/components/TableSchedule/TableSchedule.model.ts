export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: any;
  index: number;
  children: React.ReactNode;
  organizers: any;
}
export interface IAgeMap {
  [keys: string]: string | boolean | object;
}
