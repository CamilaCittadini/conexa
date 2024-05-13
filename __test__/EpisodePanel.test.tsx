import React from 'react';
import { render } from '@testing-library/react';
import { EpisodesPanel } from '@/components';
import { Episode } from '@/services';

const characterName = 'Antenna Morty';

const mockEpisodes: Episode[] = [
  {
    id: 10,
    name: 'Close Rick-counters of the Rick Kind',
    air_date: 'April 7, 2014',
    episode: 'S01E10',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/10',
    created: '2017-11-10T12:56:34.747Z',
  },
  {
    id: 28,
    name: 'The Ricklantis Mixup',
    air_date: 'September 10, 2017',
    episode: 'S03E07',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/28',
    created: '2017-11-10T12:56:36.618Z',
  },
];

describe('Episode panel', () => {
  it("should render a panel with a title, character's name and a list of episode items", () => {
    const { getByTestId, getAllByTestId } = render(
      <EpisodesPanel
        show
        episodes={mockEpisodes}
        characterName={characterName}
      />
    );

    const panelTitle = getByTestId('episode-panel-title');
    const panelCharacter = getByTestId('episode-panel-character');
    const panelEpisodes = getAllByTestId(/episode-panel-item-/);
    const panelEpisode1 = getByTestId(
      `episode-panel-item-${mockEpisodes[0].episode}`
    );
    const panelEpisode2 = getByTestId(
      `episode-panel-item-${mockEpisodes[1].episode}`
    );

    expect(panelTitle).toHaveTextContent('Episodes featuring:');
    expect(panelCharacter).toHaveTextContent(characterName);
    expect(panelEpisode1).toBeInTheDocument();
    expect(panelEpisode2).toBeInTheDocument();
    expect(panelEpisodes).toHaveLength(mockEpisodes.length);
  });
});
