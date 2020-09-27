
export interface ListScheduleProps {
    data: any;
    getDataEvent: () => void;
    types: {
        type: string;
        color: string;
    }[];
    setShowModaViewEvent: (value: boolean) => void;
    isShowModalViewEvents: boolean;
}  