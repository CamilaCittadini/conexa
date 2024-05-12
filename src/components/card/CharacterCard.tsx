import React from 'react';
import { Card } from './Card';
import { Character } from '@/services/interfaces';

interface CharacterCardProps
  extends Pick<Character, 'image' | 'name' | 'gender' | 'status' | 'species'> {
  onClick: () => void;
}

const CharacterCard = ({
  image,
  name,
  gender,
  status,
  species,
  onClick,
}: CharacterCardProps) => {
  return (
    <Card.Root onClick={onClick}>
      <Card.Image src={image} alt={name} />
      <Card.Content>
        <Card.Title>{name}</Card.Title>
        <Card.Chip>{gender}</Card.Chip>
        <Card.Chip>{status}</Card.Chip>
        <Card.Chip>{species}</Card.Chip>
      </Card.Content>
    </Card.Root>
  );
};

export { CharacterCard };
