import React from 'react';
import { CharactersGrid, GridIdsEnum } from '@/components/grid/CharactersGrid';
import { EpisodesGrid } from '@/components/grid/EpisodesGrid';
import { Grid, GridType } from '@/components/grid/Grid';
import { CharactersProvider } from '@/contexts/charactersProvider';
import { getCharacters } from '@/services/characters';
import { Character, Info } from '@/services/interfaces';

interface HomePageProps {
  initialData: Info<Character[]>;
}

const HomePage = ({ initialData }: HomePageProps) => {
  return (
    <CharactersProvider initialData={initialData}>
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
    const { data } = res;

    return {
      props: {
        initialData: data,
      },
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
