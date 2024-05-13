import React from 'react';
import { Episode } from '@/services';

type EpisodesItemProps = Pick<Episode, 'episode' | 'air_date' | 'name'>;

const EpisodesItem = ({ episode, name, air_date }: EpisodesItemProps) => {
  return (
    <p>
      <span>{episode}</span>
      <span className="font-semibold">{` - ${name}- `}</span>
      <span className="text-sm text-gray-500">{air_date}</span>
    </p>
  );
};

export { EpisodesItem };
