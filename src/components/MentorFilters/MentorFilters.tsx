import React, {FC, useState} from "react";
import {MentorFiltersPattern} from "./MentorFilterPattern";
import {TestTableSchedule} from "../TestTable/TestTableSchedule";

import {events} from "../../mocks/events";

export const MentorFilters: FC = () => {
    const [filerFlags, setFilterFlags] = useState({});
    const [dates, setDates] = useState([]);

    const data = events.map((item) => {
        const course = item.course;
        return item.events.map((event) => {
            return {
                ...event,
                course: course
            }
        })
    }).flat();

    const hasFilterFlag = (data: any, flags: any): boolean => {
        const keys = Object.keys(flags);
        if (keys.length === 0) {
            return true;
        }
        const keysToCheck: string[] = keys.filter((key: string) => flags[key].length > 0);
        const valueToCheck: string[] = keys.reduce((acc: any[], key: string) => [...acc, flags[key]], []).flat();
        for (const key of keysToCheck) {
            if (!valueToCheck.includes(data[key])) {
                return false;
            }
        }
        return true;
    };

    const isInDateRange = (date: any, dateRange: any): boolean => {
        if (dateRange.length === 0) {
            return  true;
        }
        const compareDate = new Date(date);
        const firstDate = new Date(dateRange[0]);
        const lastDate = new Date(dateRange[1]);
        if (firstDate < compareDate && compareDate < lastDate) {
            return true;
        }
        return false;
    }

    const visibleData = data
        .filter((item) => hasFilterFlag(item, filerFlags))
        .filter((item) => isInDateRange(item.timestamp, dates));

    return (
        <>
            <MentorFiltersPattern data={data} filterFlag={filerFlags} setFilterFlags={setFilterFlags} setDates={setDates}/>
            <TestTableSchedule visibleData={visibleData}/>
        </>
    )

}
