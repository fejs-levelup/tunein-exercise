import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Container } from './styles';

import { actions, selectors } from '../../services/stations/stationsSlice';
import StationPreview from '../../components/StationPreview';

const { fetchStations, setTag } = actions;
const {
  getStationIds,
  getStationTags,
  getTag,
  getStationsLoading,
  getStationsError
} = selectors;

const Stations = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  const loading = useSelector(getStationsLoading);
  const error = useSelector(getStationsError);
  const stations = useSelector(getStationIds);
  const tags = useSelector(getStationTags);
  const selectedTag = useSelector(getTag);

  const dispatch = useDispatch();

  const handleSelectStation = useCallback(id => {
    setSelectedStation(state => state === id ? null: id);
  }, []);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  if(loading)
    return (
      <Typography variant="body2">Loading...</Typography>
    );

  if(error)
    return (
      <Typography variant="body2">Error...</Typography>
    );

  return (
    <Container maxWidth="xs">
      <Grid container rowSpacing={1} columnSpacing={1}>
        {tags.map(tag => (
          <Grid item key={tag}>
            <Chip
              label={tag}
              color="primary"
              variant={selectedTag === tag ? 'filled' : 'outlined'}
              onClick={() => dispatch(setTag(tag))}
            />
          </Grid>
        ))}
      </Grid>

      <List>
        {stations.map(id => (
          <StationPreview
            key={id}
            stationId={id}
            selected={selectedStation === id}
            onSelect={handleSelectStation}
          />
        ))}
      </List>
    </Container>
  );
};

export default Stations;
