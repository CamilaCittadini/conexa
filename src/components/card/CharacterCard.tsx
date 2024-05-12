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
  disabled: boolean;
}

const CharacterCard = ({
  selected,
  image,
  name,
  gender,
  status,
  species,
  onClick,
  disabled,
}: CharacterCardProps) => {
  return (
    <Card.Root selected={selected} disabled={disabled} onClick={onClick}>
      <Card.Image src={image} alt={name} />
      <Card.Content>
        <Card.Title>{name}</Card.Title>
        <Card.Chip item="Gender" content={gender} selected={selected} />
        <Card.Chip item="Status" content={status} selected={selected} />
        <Card.Chip item="Species" content={species} selected={selected} />
      </Card.Content>
    </Card.Root>
  );
};

export { CharacterCard };
