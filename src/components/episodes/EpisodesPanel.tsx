import React from 'react';
import { EpisodesItem } from './EpisodesItem';
import { Grid, GridType } from '../grid/Grid';
import { Episode } from '@/services/interfaces';

interface EpisodesPanelProps {
  show: boolean;
  episodes: Episode[];
  characterName: string;
}

const EpisodesPanel = ({
  show,
  episodes,
  characterName,
}: EpisodesPanelProps) => {
  return (
    <section className="w-full">
      {show && (
        <div>
          <div className="p-2">
            <h3 className="text-sm text-gray-500">Episodes featuring:</h3>
            <h4 className="font-semibold">{characterName}</h4>
          </div>

          <div className="border rounded-lg p-3">
            {episodes?.map(({ id, name, air_date, episode }) => (
              <EpisodesItem
                key={id}
                name={name}
                air_date={air_date}
                episode={episode}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export { EpisodesPanel };