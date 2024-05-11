import React from 'react';
import { Card } from './Card';

const CharacterCard = ({
  image,
  name,
  gender,
  status,
  species,
}: {
  image: string;
  name: string;
  gender: string;
  status: string;
  species: string;
}) => {
  return (
    <Card.Root>
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
