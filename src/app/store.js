import { configureStore } from '@reduxjs/toolkit';
import stationsReducer from '../services/stations/stationsSlice';

export const store = configureStore({
  reducer: {
    stations: stationsReducer
  }
});
