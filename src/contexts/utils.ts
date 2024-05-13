import { Character, Episode } from '@/services';

const findCharacterEpisodes = (
  characterId: number,
  characters: Character[]
) => {
  const foundEpisodes =
    characters.find((character) => character?.id === characterId)?.episode ||
    [];
  return foundEpisodes;
};

const findSharedEpisodes = (
  characterOneId: number,
  characterTwoId: number,
  characters: Character[]
) => {
  const charOneEpisodes = findCharacterEpisodes(characterOneId, characters);
  const charTwoEpisodes = findCharacterEpisodes(characterTwoId, characters);

  const sharedEpisodes =
    charOneEpisodes?.filter((episode) => charTwoEpisodes?.includes(episode)) ||
    [];
  return sharedEpisodes;
};

const extractEpisodeId = (url: string) => {
  const urlFragments = url.split('/');
  const episodeId = urlFragments[urlFragments.length - 1];
  return episodeId;
};

const mapEpisodesIds = (urls: string[]) =>
  urls.map((url) => extractEpisodeId(url));

export const findSharedEpisodesIds = (
  charIdOne: number | null,
  charIdTwo: number | null,
  characters: Character[]
) => {
  if (charIdOne && charIdTwo) {
    const sharedEpisodesArray = findSharedEpisodes(
      charIdOne,
      charIdTwo,
      characters
    );
    const episodesIds = mapEpisodesIds(sharedEpisodesArray);
    return episodesIds;
  }
  return [];
};

export const findOnlyEpisodesIds = (
  characterId: number | null,
  characters: Character[]
) => {
  if (characterId) {
    const characterEpisodes = findCharacterEpisodes(characterId, characters);
    const episodesIds = mapEpisodesIds(characterEpisodes);
    return episodesIds;
  }
  return [];
};

export const determineEpisodesData = (data: Episode[] | undefined) => {
  if (data) {
    if (Array.isArray(data)) {
      return data;
    }
    return [data];
  }
  return [];
};
