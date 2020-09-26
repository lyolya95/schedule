export interface MapsProps {
    isMentorStatus: Boolean;
    chosenCoordinates: number[];
    changeCoords?(coords:number[]):void;
}  