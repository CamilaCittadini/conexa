import React from 'react';
import { Card } from './Card';
import { Character } from '@/services/interfaces';

interface CharacterCardProps
  extends Pick<
    Character,
    'id' | 'image' | 'name' | 'gender' | 'status' | 'species'
  > {
  onClick: () => void;
  selected: boolean;
}

const CharacterCard = ({
  selected,
  image,
  name,
  gender,
  status,
  species,
  onClick,
}: CharacterCardProps) => {
  return (
    <Card.Root selected={selected} onClick={onClick}>
      <Card.Image src={image} alt={name} />
      <Card.Content>
        <Card.Title>{name}</Card.Title>
        <Card.Chip item="Gender" content={gender} />
        <Card.Chip item="Status" content={status} />
        <Card.Chip item="Species" content={species} />
      </Card.Content>
    </Card.Root>
  );
};

export { CharacterCard };
