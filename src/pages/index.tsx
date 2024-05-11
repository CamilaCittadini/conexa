import { CharacterCard } from '@/components/card/CharacterCard';
import { getCharacters } from '@/services/characters';
import { Character } from '@/services/interfaces';
import React from 'react';

interface HomePageProps {
  charactersList: Character[];
}

const HomePage = ({ charactersList }: HomePageProps) => {
  console.log(charactersList);
  return (
    <div className="grid grid-cols-2 w-full gap-5">
      <div className="flex flex-col items-center justify-center gap-4 w-full overflow-scroll">
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
      </div>
      <div className="flex flex-col items-center gap-4 w-full bg-red">
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
      </div>
    </div>
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
