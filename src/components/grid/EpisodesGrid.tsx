import React from 'react';
import { useCharacters } from '@/contexts/charactersProvider';
import { Character } from '@/services';
import { EpisodesPanel } from '../episodes/EpisodesPanel';
import { Grid, GridTypeEnum } from './Grid';

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
  const nothingSelected =
    !characterOneEpisodes.length && !characterTwoEpisodes.length;

  if (nothingSelected) {
    return null;
  }

  return (
    <Grid type={GridTypeEnum.episodes}>
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
