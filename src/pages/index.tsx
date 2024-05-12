import { CharactersGrid } from '@/components/grid/CharactersGrid';
import { EpisodesGrid } from '@/components/grid/EpisodesGrid';
import { Grid } from '@/components/grid/Grid';
import { CharactersProvider } from '@/contexts/charactersProvider';
import { getCharacters } from '@/services/characters';
import { Character } from '@/services/interfaces';
import React from 'react';

interface HomePageProps {
  initialCharactersList: Character[];
  totalCharacters: number;
}

const HomePage = ({
  initialCharactersList,
  totalCharacters,
}: HomePageProps) => {
  return (
    <CharactersProvider
      initialCharacters={initialCharactersList}
      totalCharacters={totalCharacters}
    >
      <Grid>
        <CharactersGrid gridId="charactersOne" />
        <CharactersGrid gridId="charactersTwo" />
        <EpisodesGrid />
      </Grid>
    </CharactersProvider>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const res = await getCharacters({ page: 0 });
  const {
    data: { results, info },
  } = res;

  return {
    props: { initialCharactersList: results, totalCharacters: info?.count },
  };
}
