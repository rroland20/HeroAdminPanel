import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../../shared/model/http.hook";
import { EntityState } from '@reduxjs/toolkit';
import { iFiltersState, eFiltersStatus, eActiveFilterStatus } from "./types";


const filtersAdapter = createEntityAdapter();

const initialState : iFiltersState = filtersAdapter.getInitialState({
    filters: [],
    filtersLoadingStatus: eFiltersStatus.Idle,
    activeFilter: eActiveFilterStatus.All,
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
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = eFiltersStatus.Loading;})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = eFiltersStatus.Idle;
                filtersAdapter.setAll(state as unknown as EntityState<unknown>, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = eFiltersStatus.Error;})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    activeFilterChanged
} = actions;