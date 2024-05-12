import React from 'react';
import { Card } from './Card';
import { Character } from '@/services/interfaces';

const CharacterCard = ({
  image,
  name,
  gender,
  status,
  species,
  onClick,
}: { onClick: () => void } & Pick<
  Character,
  'id' | 'image' | 'name' | 'gender' | 'status' | 'species'
>) => {
  return (
    <Card.Root onClick={onClick}>
      <Card.Image
        src={image}
        alt={name}
        className="object-cover rounded-t-md"
      />
      <Card.Content className="p-4">
        <Card.Title className="font-semibold text-center underline">
          {name}
        </Card.Title>
        <Card.Chip>{gender}</Card.Chip>
        <Card.Chip>{status}</Card.Chip>
        <Card.Chip>{species}</Card.Chip>
      </Card.Content>
    </Card.Root>
  );
};

export { CharacterCard };
