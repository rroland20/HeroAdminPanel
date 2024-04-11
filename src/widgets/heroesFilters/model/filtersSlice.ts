import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../../shared/model/http.hook";
import { EntityState } from '@reduxjs/toolkit';
import { FiltersState, FiltersStatus, ActiveFilterStatus } from "./types";


const filtersAdapter = createEntityAdapter();

const initialState : FiltersState = filtersAdapter.getInitialState({
    filters: [],
    filtersLoadingStatus: FiltersStatus.Idle,
    activeFilter: ActiveFilterStatus.All,
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
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = FiltersStatus.Loading;})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                const actualState = state as unknown as EntityState<unknown>;
                state.filters = action.payload;
                state.filtersLoadingStatus = FiltersStatus.Idle;
                filtersAdapter.setAll(actualState, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = FiltersStatus.Error;})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    activeFilterChanged
} = actions;