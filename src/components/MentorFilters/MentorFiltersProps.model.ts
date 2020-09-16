export interface MentorFiltersProps {
    data: any,
    filterFlag: any,
    setFilterFlags(flag: {}): void,
    setDates(date: []): void,
    tagRender(props: any): JSX.Element,
    defaultColumns: string[],
    optionsKeyOfEvents: any,
    changeColumnsSelect(value: any): void
}