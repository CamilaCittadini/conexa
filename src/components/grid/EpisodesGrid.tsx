import React from 'react';
import { Grid } from './Grid';
import { useCharacters } from '@/contexts/charactersProvider';

const EpisodesGrid = () => {
  const { characterOneEpisodes, characterTwoEpisodes, sharedEpisodes } =
    useCharacters();

  return (
    <Grid type="episodes">
      <div>
        {!!characterOneEpisodes.length &&
          characterOneEpisodes?.map((episode) => (
            <div key={episode.id}>{episode.name}</div>
          ))}
      </div>
      <div>
        {!!sharedEpisodes.length &&
          sharedEpisodes?.map((episode) => (
            <div key={episode.id}>{episode.name}</div>
          ))}
      </div>
      <div>
        {!!characterTwoEpisodes.length &&
          characterTwoEpisodes?.map((episode) => (
            <div key={episode.id}>{episode.name}</div>
          ))}
      </div>
    </Grid>
  );
};

export { EpisodesGrid };
