import React from 'react';
import { Grid } from './Grid';
import { CharacterCard } from '../card/CharacterCard';
import { useCharacters } from '@/contexts/charactersProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  } = useCharacters();

  const onClickSelector: Record<GridIdsEnum, (id: number) => void> = {
    charactersOne: (id: number) => handleSelectCharactersOne(id),
    charactersTwo: (id: number) => handleSelectCharactersTwo(id),
  };

  return (
    <div id={gridId} className="h-[800px] overflow-auto flex flex-col">
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>} // TODO: replace with a skeleton row
        scrollableTarget={gridId}
      >
        <Grid>
          {characters.map(({ id, name, status, gender, species, image }) => (
            <CharacterCard
              key={id}
              name={name}
              status={status}
              gender={gender}
              species={species}
              image={image}
              onClick={() => onClickSelector[gridId](id)}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export { CharactersGrid };
