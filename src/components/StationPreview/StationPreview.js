import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PT from 'prop-types';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { selectors } from '../../services/stations/stationsSlice';

const { getStationById } = selectors;

const StationPreview = ({
  stationId,
  selected,
  onSelect
}) => {
  const {
    name,
    imgUrl,
    description,
    streamUrl,
    tags
  } = useSelector(state => getStationById(state, stationId));

  const handleSelect = useCallback(() => {
    onSelect(stationId);
  }, [stationId, onSelect]);

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="play" onClick={handleSelect}>
            <PlayCircleIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={handleSelect}>
          <ListItemAvatar>
            <Avatar
              alt={`Radio "${name}" cover image`}
              src={imgUrl}
            />
          </ListItemAvatar>

          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>

      <Collapse in={selected} timeout="auto" unmountOnExit>
        {/* unfortunately, none of the radio urls are working now */}
        <audio src={streamUrl} autoPlay controls></audio>

        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>

        <Stack direction="row" spacing={1}>
          {tags.map(tag => (
            <Chip key={tag} size="small" label={tag} />
          ))}
        </Stack>
      </Collapse>
    </>
  );
};

StationPreview.propTypes = {
  stationId: PT.string.isRequired,
  selected: PT.bool.isRequired,
  onSelect: PT.func.isRequired
};

export default React.memo(StationPreview);
