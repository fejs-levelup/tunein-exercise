import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const stationsAdapter = createEntityAdapter({
  // The most popular and reliable stations must go first
  sortComparer: (a, b) => b.reliability * b.popularity - a.reliability * a.popularity,
});

const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  async () => {
    const result = await fetch('https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json');
    const data = await result.json();

    return data;
  }
);

export const stationsSlice = createSlice({
  name: 'stations',
  initialState: stationsAdapter.getInitialState({
    loading: false,
    error: null,
    tag: null
  }),
  reducers: {
    setTag: (state, { payload }) => {
      state.tag = state.tag === payload ? null : payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        stationsAdapter.setAll(state, action.payload.data);
        state.loading = false;
      })
      .addCase(fetchStations.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch a list of stations.';
      });
  }
});

const getStationsLoading = state => state.stations.loading;
const getStationsError = state => state.stations.error;
const getTag = state => state.stations.tag;
const stationsSelectors = stationsAdapter.getSelectors(state => state.stations);
const getStationIds = state => {
  const { tag } = state.stations;

  if(!tag)
    return stationsSelectors.selectIds(state);
  else
    return stationsSelectors
      .selectAll(state)
      .filter(({ tags }) => tags.includes(tag))
      .map(({ id }) => id);
};
const getStationById = (state, id) => stationsSelectors.selectById(state, id);
const getStationTags = state => {
  const tags = stationsSelectors
    .selectAll(state)
    .map(({ tags }) => tags)
    .flat();

  return Array.from(new Set(tags));
};

export default stationsSlice.reducer;
export const actions = {
  ...stationsSlice.actions,
  fetchStations
};
export const selectors = {
  getStationsLoading,
  getStationsError,
  getTag,
  getStationIds,
  getStationById,
  getStationTags
};
