export type Filters = {
    id: string;
    name: string;
    label: string;
    className: string;
};

type LoadingType = 'idle' | 'loading' | 'error';
type ActiveFilterType = 'all' | 'fire' | 'water' | 'wind' | 'earth';

export interface ISomeState {
   filters: Filters[];
   filtersLoadingStatus: LoadingType;
   activeFilter: ActiveFilterType;
}