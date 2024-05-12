import { getCharacters } from '@/services/characters';
import { getMultipleEpisodes } from '@/services/episodes';
import { Character, Episode, Info } from '@/services/interfaces';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  determineEpisodesData,
  findOnlyEpisodesIds,
  findSharedEpisodesIds,
} from './utils';

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
  initialData,
  children,
}: {
  initialData: Info<Character[]>;
  children: React.ReactNode;
}) => {
  const totalCharacters = initialData.info?.count || 20;
  const [selectedCharacters, setSelectedCharacters] = useState<{
    characterOne: number | null;
    characterTwo: number | null;
  }>({ characterOne: null, characterTwo: null });

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get-infinite-characters'],
      queryFn: ({ pageParam }) => getCharacters({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, currentPageParam) => {
        const totalPages = lastPage?.data?.info?.pages || 1;

        if (currentPageParam < totalPages) {
          const nextPage = currentPageParam + 1;
          return nextPage;
        }
        return undefined;
      },
    });

  const characters = useMemo(() => {
    return data
      ? data.pages.flatMap((page) => page.data.results as Character[])
      : (initialData.results as Character[]);
  }, [data, initialData]);

  const handleSelectCharactersOne = useCallback(
    (id: number) => {
      if (id === selectedCharacters.characterTwo) {
        return;
      }
      if (id === selectedCharacters.characterOne) {
        setSelectedCharacters((prev) => ({ ...prev, characterOne: null }));
        return;
      }
      setSelectedCharacters((prev) => ({ ...prev, characterOne: id }));
    },
    [selectedCharacters]
  );

  const handleSelectCharactersTwo = useCallback(
    (id: number) => {
      if (id === selectedCharacters.characterOne) {
        return;
      }
      if (id === selectedCharacters.characterTwo) {
        setSelectedCharacters((prev) => ({ ...prev, characterTwo: null }));
        return;
      }
      setSelectedCharacters((prev) => ({ ...prev, characterTwo: id }));
    },
    [selectedCharacters]
  );

  const episodesCharacterOneIds = useMemo(
    () => findOnlyEpisodesIds(selectedCharacters.characterOne, characters),
    [selectedCharacters.characterOne, characters]
  );

  const episodesCharacterTwoIds = useMemo(
    () => findOnlyEpisodesIds(selectedCharacters.characterTwo, characters),
    [selectedCharacters.characterTwo, characters]
  );

  const sharedEpisodesIds = useMemo(
    () =>
      findSharedEpisodesIds(
        selectedCharacters.characterOne,
        selectedCharacters.characterTwo,
        characters
      ),
    [selectedCharacters, characters]
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

  const characterOneEpisodes = useMemo(
    () => determineEpisodesData(episodesCharOneData?.data),
    [episodesCharOneData]
  );
  const characterTwoEpisodes = useMemo(
    () => determineEpisodesData(episodesCharTwoData?.data),
    [episodesCharTwoData]
  );
  const sharedEpisodes = useMemo(
    () => determineEpisodesData(sharedEpisodesData?.data),
    [sharedEpisodesData]
  );

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
