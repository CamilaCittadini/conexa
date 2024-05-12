import React from 'react';
import { Grid, GridType } from './Grid';
import { useCharacters } from '@/contexts/charactersProvider';
import { EpisodesPanel } from '../episodes/EpisodesPanel';
import { Character } from '@/services/interfaces';

const findCharacterName = (charactersArray: Character[], id: number | null) => {
  if (id && charactersArray.length) {
    return charactersArray.find((character) => character.id === id)?.name || '';
  }
  return '';
};

const EpisodesGrid = () => {
  const {
    characterOneEpisodes,
    characterTwoEpisodes,
    sharedEpisodes,
    selectedCharacters,
    characters,
  } = useCharacters();

  const nameCharacterOne = findCharacterName(
    characters,
    selectedCharacters.characterOne
  );

  const nameCharacterTwo = findCharacterName(
    characters,
    selectedCharacters.characterTwo
  );

  const sharedNames = `${nameCharacterOne} and ${nameCharacterTwo}`;

  return (
    <Grid type={GridType.episodes}>
      <EpisodesPanel
        show={!!characterOneEpisodes.length}
        episodes={characterOneEpisodes}
        characterName={nameCharacterOne}
      />

      <EpisodesPanel
        show={!!sharedEpisodes.length}
        episodes={sharedEpisodes}
        characterName={sharedNames}
      />

      <EpisodesPanel
        show={!!characterTwoEpisodes.length}
        episodes={characterTwoEpisodes}
        characterName={nameCharacterTwo}
      />
    </Grid>
  );
};

export { EpisodesGrid };
