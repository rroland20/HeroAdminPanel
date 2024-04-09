import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../../shared/model/http.hook";
import { EntityState } from '@reduxjs/toolkit';
import { ISomeState } from "./types";


const filtersAdapter = createEntityAdapter();

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
                const actualState = state as unknown as EntityState<unknown>;
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(actualState, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error';})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    activeFilterChanged
} = actions;