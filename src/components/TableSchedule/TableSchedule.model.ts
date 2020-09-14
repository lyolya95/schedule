// export interface Item {
//   key: string;
//   time: string;
//   timeToComplete: string;
//   date: string;
//   place: string;
//   name: string;
//   organizer: string;
//   url: string;
//   task: string;
//   materials: string;
//   result: string;
//   comment: string;
//   importance: boolean;
//   done: boolean;
//   score: number;
//   tags: any;
// }
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: any;
  index: number;
  children: React.ReactNode;
}
export interface IAgeMap {
  [keys: string]: string | boolean | object;
}
