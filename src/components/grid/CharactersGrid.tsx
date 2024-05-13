import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, GridTypeEnum } from './Grid';
import { CardSkeleton, CharacterCard } from '../card';
import { useCharacters } from '@/contexts/charactersProvider';

export enum GridIdsEnum {
  charactersOne = 'charactersOne',
  charactersTwo = 'charactersTwo',
}
interface CharactersGridProps {
  gridId: GridIdsEnum;
}

const CharactersGrid = ({ gridId }: CharactersGridProps) => {
  const {
    characters,
    fetchNextPage,
    hasNextPage,
    handleSelectCharactersOne,
    handleSelectCharactersTwo,
    selectedCharacters,
  } = useCharacters();

  const characterCardConfig: Record<
    GridIdsEnum,
    {
      onClick: (id: number) => void;
      selected: (id: number) => boolean;
      disabled: (id: number) => boolean;
    }
  > = {
    charactersOne: {
      onClick: (id: number) => handleSelectCharactersOne(id),
      selected: (id: number) => selectedCharacters.characterOne === id,
      disabled: (id: number) => selectedCharacters.characterTwo === id,
    },
    charactersTwo: {
      onClick: (id: number) => handleSelectCharactersTwo(id),
      selected: (id: number) => selectedCharacters.characterTwo === id,
      disabled: (id: number) => selectedCharacters.characterOne === id,
    },
  };

  return (
    <div
      id={gridId}
      className="h-[800px] w-full overflow-auto flex flex-col no-scrollbar"
    >
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <Grid type={GridTypeEnum.characters}>
            <CardSkeleton />
            <CardSkeleton />
          </Grid>
        }
        scrollableTarget={gridId}
      >
        <Grid>
          {characters.map(({ id, name, status, gender, species, image }) => (
            <CharacterCard
              selected={characterCardConfig[gridId].selected(id)}
              disabled={characterCardConfig[gridId].disabled(id)}
              id={id}
              key={id}
              name={name}
              status={status}
              gender={gender}
              species={species}
              image={image}
              onClick={() => characterCardConfig[gridId].onClick(id)}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export { CharactersGrid };
