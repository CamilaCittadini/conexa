import { getCharacters } from '@/services/characters';
import { getMultipleEpisodes } from '@/services/episodes';
import { Character, Episode } from '@/services/interfaces';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CharactersContext = createContext<{
  characters: Character[];
  totalCharacters: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleSelectCharactersOne: (id: number) => void;
  handleSelectCharactersTwo: (id: number) => void;
  selectedCharacters: {
    characterOne: number | null;
    characterTwo: number | null;
  };
  characterOneEpisodes: Episode[];
  characterTwoEpisodes: Episode[];
  sharedEpisodes: Episode[];
}>({
  characters: [],
  totalCharacters: 20,
  hasNextPage: false,
  fetchNextPage: () => {},
  isFetchingNextPage: false,
  handleSelectCharactersOne: () => {},
  handleSelectCharactersTwo: () => {},
  selectedCharacters: { characterOne: null, characterTwo: null },
  characterOneEpisodes: [],
  characterTwoEpisodes: [],
  sharedEpisodes: [],
});

const CharactersProvider = ({
  initialCharacters,
  totalCharacters,
  children,
}: {
  initialCharacters: Character[];
  totalCharacters: number;
  children: React.ReactNode;
}) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedCharacters, setSelectedCharacters] = useState<{
    characterOne: number | null;
    characterTwo: number | null;
  }>({ characterOne: null, characterTwo: null });

  const {
    data,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-infinite-characters'],
    queryFn: ({ pageParam }) => getCharacters({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, currentPageParam) => {
      const totalPages = lastPage?.data?.info?.pages || 1;
      if (currentPageParam < totalPages) {
        const nextPage = currentPageParam + 1;
        return nextPage;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const newPages = data.pages;
      if (newPages.length) {
        const newCharacters =
          newPages.flatMap(
            (pagesData) => pagesData.data.results as Character[]
          ) || [];
        setCharacters(newCharacters);
      }
    }
  }, [isSuccess, data]);

  const handleSelectCharactersOne = (id: number) => {
    if (id === selectedCharacters.characterTwo) {
      return;
    }
    if (id === selectedCharacters.characterOne) {
      setSelectedCharacters((prev) => ({ ...prev, characterOne: null }));
      return;
    }
    setSelectedCharacters((prev) => ({ ...prev, characterOne: id }));
  };

  const handleSelectCharactersTwo = (id: number) => {
    if (id === selectedCharacters.characterOne) {
      return;
    }
    if (id === selectedCharacters.characterTwo) {
      setSelectedCharacters((prev) => ({ ...prev, characterOne: null }));
      return;
    }
    setSelectedCharacters((prev) => ({ ...prev, characterTwo: id }));
  };

  const findCharacterEpisodes = (characterId: number) => {
    const foundEpisodes =
      characters.find((char) => char.id === characterId)?.episode || [];
    return foundEpisodes;
  };

  const findSharedEpisodes = (
    characterOneId: number,
    characterTwoId: number
  ) => {
    const charOneEpisodes = findCharacterEpisodes(characterOneId);
    const charTwoEpisodes = findCharacterEpisodes(characterTwoId);

    const sharedEpisodes =
      charOneEpisodes?.filter((episode) =>
        charTwoEpisodes?.includes(episode)
      ) || [];
    return sharedEpisodes;
  };

  const extractEpisodeId = (url: string) => {
    const urlFragments = url.split('/');
    const episodeId = urlFragments[urlFragments.length - 1];
    return episodeId;
  };

  const mapEpisodesIds = (urls: string[]) =>
    urls.map((url) => extractEpisodeId(url));

  const findSharedEpisodesIds = (
    charIdOne: number | null,
    charIdTwo: number | null
  ) => {
    if (charIdOne && charIdTwo) {
      const sharedEpisodesArray = findSharedEpisodes(charIdOne, charIdTwo);
      const episodesIds = mapEpisodesIds(sharedEpisodesArray);
      return episodesIds;
    }
    return [];
  };

  const findOnlyEpisodesIds = (characterId: number | null) => {
    if (characterId) {
      const characterEpisodes = findCharacterEpisodes(characterId);
      const episodesIds = mapEpisodesIds(characterEpisodes);
      return episodesIds;
    }
    return [];
  };

  const episodesCharacterOneIds = useMemo(
    () => findOnlyEpisodesIds(selectedCharacters.characterOne),
    [selectedCharacters.characterOne]
  );

  const episodesCharacterTwoIds = useMemo(
    () => findOnlyEpisodesIds(selectedCharacters.characterTwo),
    [selectedCharacters.characterTwo]
  );

  const sharedEpisodesIds = useMemo(
    () =>
      findSharedEpisodesIds(
        selectedCharacters.characterOne,
        selectedCharacters.characterTwo
      ),
    [selectedCharacters.characterOne, selectedCharacters.characterTwo]
  );

  const { data: episodesCharOneData } = useQuery({
    queryKey: ['get-multiple-episodes', episodesCharacterOneIds],
    queryFn: () => getMultipleEpisodes({ ids: episodesCharacterOneIds }),
    enabled: !!episodesCharacterOneIds.length,
  });

  const { data: episodesCharTwoData } = useQuery({
    queryKey: ['get-multiple-episodes', episodesCharacterTwoIds],
    queryFn: () => getMultipleEpisodes({ ids: episodesCharacterTwoIds }),
    enabled: !!episodesCharacterTwoIds.length,
  });

  const { data: sharedEpisodesData } = useQuery({
    queryKey: ['get-multiple-episodes', sharedEpisodesIds],
    queryFn: () => getMultipleEpisodes({ ids: sharedEpisodesIds }),
    enabled: !!sharedEpisodesIds.length,
  });

  const determineEpisodesData = (data: Episode[] | undefined) => {
    if (data) {
      if (Array.isArray(data)) {
        return data;
      }
      return [data];
    }
    return [];
  };
  const characterOneEpisodes = determineEpisodesData(episodesCharOneData?.data);
  const characterTwoEpisodes = determineEpisodesData(episodesCharTwoData?.data);
  const sharedEpisodes = determineEpisodesData(sharedEpisodesData?.data);

  const value = useMemo(
    () => ({
      characters,
      totalCharacters,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      fetchNextPage,
      handleSelectCharactersOne,
      selectedCharacters,
      handleSelectCharactersTwo,
      characterOneEpisodes,
      characterTwoEpisodes,
      sharedEpisodes,
    }),
    [
      characters,
      totalCharacters,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      handleSelectCharactersOne,
      handleSelectCharactersTwo,
      selectedCharacters,
      characterOneEpisodes,
      characterTwoEpisodes,
      sharedEpisodes,
    ]
  );

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};

const useCharacters = () => {
  const context = useContext(CharactersContext);

  return context;
};

export { CharactersProvider, useCharacters };
