import { configureStore } from '@reduxjs/toolkit';
import filters from '../widgets/heroesFilters/filtersSlice';
import { apiSlice } from '../shared/api/apiSlice';

const stringMiddleware = () => (next) => (action) => {
     if (typeof action === 'string') {
          return next({
               type: action
          })
     }
     return next(action);
}

export const store = configureStore({
     reducer: {filters, [apiSlice.reducerPath]: apiSlice.reducer},
     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
     devTools: process.env.NODE_ENV !== 'production',
});
