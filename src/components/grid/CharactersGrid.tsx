import React from 'react';
import { Grid } from './Grid';
import { CharacterCard } from '../card/CharacterCard';
import { useCharacters } from '@/contexts/charactersProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

const CharactersGrid = ({ gridId }: { gridId: string }) => {
  const {
    characters,
    fetchNextPage,
    hasNextPage,
    handleSelectCharactersOne,
    handleSelectCharactersTwo,
  } = useCharacters();
  return (
    <div
      id={gridId}
      style={{
        height: 800,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollableTarget={gridId}
      >
        <Grid>
          {characters.map(({ id, name, status, gender, species, image }) => (
            <CharacterCard
              id={id}
              key={id}
              name={name}
              status={status}
              gender={gender}
              species={species}
              image={image}
              onClick={
                gridId === 'charactersOne'
                  ? () => handleSelectCharactersOne(id)
                  : () => handleSelectCharactersTwo(id)
              }
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export { CharactersGrid };
