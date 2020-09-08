export interface Item {
  key: string;
  time: string;
  timeToComplete: string;
  date: string;
  week: number;
  course: string;
  place: string;
  name: string;
  organizer: string;
  url: string;
  task: string;
  materials: string;
  result: string;
  comment: string;
  importance: boolean;
  done: boolean;
  score: number;
  tags: any;
}
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}
export interface IAgeMap {
  [keys: string]: string | boolean | object;
}
