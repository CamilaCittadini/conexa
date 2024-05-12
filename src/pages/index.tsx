import React from 'react';
import { CharactersGrid, GridIdsEnum } from '@/components/grid/CharactersGrid';
import { EpisodesGrid } from '@/components/grid/EpisodesGrid';
import { Grid, GridType } from '@/components/grid/Grid';
import { CharactersProvider } from '@/contexts/charactersProvider';
import { getCharacters } from '@/services/characters';
import { Character } from '@/services/interfaces';

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
      <div className="flex flex-col items-center justify-center gap-4">
        <Grid type={GridType.container}>
          <CharactersGrid gridId={GridIdsEnum.charactersOne} />
          <CharactersGrid gridId={GridIdsEnum.charactersTwo} />
        </Grid>
        <EpisodesGrid />
      </div>
    </CharactersProvider>
  );
};

export default HomePage;

export async function getServerSideProps() {
  try {
    const res = await getCharacters({ page: 1 });
    const {
      data: { results, info },
    } = res;

    return {
      props: { initialCharactersList: results, totalCharacters: info?.count },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
}
