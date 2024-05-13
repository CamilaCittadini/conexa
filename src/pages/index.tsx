import React from 'react';
import {
  CharactersGrid,
  GridIdsEnum,
  EpisodesGrid,
  Grid,
  GridTypeEnum,
} from '@/components';
import { CharactersProvider } from '@/contexts/charactersProvider';
import { Character, Info, getCharacters } from '@/services';

interface HomePageProps {
  initialData: Info<Character[]>;
}

const HomePage = ({ initialData }: HomePageProps) => {
  return (
    <CharactersProvider initialData={initialData}>
      <div className="flex flex-col items-center justify-center gap-4">
        <Grid type={GridTypeEnum.container}>
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
