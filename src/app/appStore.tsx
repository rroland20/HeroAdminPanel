import { configureStore } from '@reduxjs/toolkit';
import filters from '../widgets/heroesFilters/model/filtersSlice';
import { apiSlice } from '../shared/api/apiSlice';

export const store = configureStore({
     reducer: {
          filters,
          [apiSlice.reducerPath]: apiSlice.reducer
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
     devTools: process.env.NODE_ENV !== 'production',
});
