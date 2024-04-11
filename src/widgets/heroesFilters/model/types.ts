
export type tFilterForHero = {
    id: string;
    name: string;
    label: string;
    className: string;
};

export enum eFiltersStatus {
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
};

export enum eActiveFilterStatus {
    All = 'all',
    Fire = 'fire',
    Water = 'water',
    Wind = 'wind',
    Earth = 'earth',
};

export interface iFiltersState {
   filters: tFilterForHero[];
   filtersLoadingStatus: eFiltersStatus;
   activeFilter: eActiveFilterStatus;
};