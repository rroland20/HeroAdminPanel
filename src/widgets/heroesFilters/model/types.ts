
export type FilterForHero = {
    id: string;
    name: string;
    label: string;
    className: string;
};

export enum FiltersStatus {
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
};

export enum ActiveFilterStatus {
    All = 'all',
    Fire = 'fire',
    Water = 'water',
    Wind = 'wind',
    Earth = 'earth',
};

export interface FiltersState {
   filters: FilterForHero[];
   filtersLoadingStatus: FiltersStatus;
   activeFilter: ActiveFilterStatus;
};