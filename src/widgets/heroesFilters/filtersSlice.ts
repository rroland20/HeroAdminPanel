import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../shared/model/http.hook";
import { log } from "console";

const filtersAdapter = createEntityAdapter();

type LoadingType = 'idle' | 'loading' | 'error';
type ActiveFilterType = 'all' | 'fire' | 'water' | 'wind' | 'earth';
type filtersType = 'id' | 'name' | 'label' | 'className';

export interface ISomeState {
   filters: Array<filtersType>;
   filtersLoadingStatus: LoadingType;
   activeFilter: ActiveFilterType;
}

const initialState : ISomeState = filtersAdapter.getInitialState({
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading';})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                
                state.filters = action.payload;
                console.log(typeof state.filters);
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error';})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;