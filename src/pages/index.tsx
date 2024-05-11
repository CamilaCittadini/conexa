import { CharacterCard } from '@/components/card/CharacterCard';
import { Grid } from '@/components/grid/Grid';
import { getCharacters } from '@/services/characters';
import { Character } from '@/services/interfaces';
import React from 'react';

interface HomePageProps {
  charactersList: Character[];
}

const HomePage = ({ charactersList }: HomePageProps) => {
  return (
    <Grid.Root colsNumber={2}>
      <Grid.Column>
        {charactersList.map(({ id, name, status, gender, species, image }) => (
          <CharacterCard
            key={id}
            name={name}
            status={status}
            gender={gender}
            species={species}
            image={image}
          />
        ))}
      </Grid.Column>
      <Grid.Column>
        {charactersList.map(({ id, name, status, gender, species, image }) => (
          <CharacterCard
            key={id}
            name={name}
            status={status}
            gender={gender}
            species={species}
            image={image}
          />
        ))}
      </Grid.Column>
    </Grid.Root>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const res = await getCharacters({ page: 0 });
  const {
    data: { results },
  } = res;

  return {
    props: { charactersList: results },
  };
}
