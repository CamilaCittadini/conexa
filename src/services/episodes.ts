import axios from 'axios';
import { Episode, Info } from './interfaces';

const baseUrl = process.env.BASE_URL;

export const getEpisodes = async ({
  page,
  name,
  episode,
}: {
  page: number;
  name?: string;
  episode?: string;
}) => {
  return await axios.get<Info<Episode[]>>(`${baseUrl}/episode`, {
    params: {
      page,
      ...(name && { name }),
      ...(episode && { episode }),
    },
  });
};

export const getSingleEpisode = async ({
  page,
  id,
}: {
  page: number;
  id: string;
}) => {
  return await axios.get<Info<Episode>>(`${baseUrl}/location/${id}`, {
    method: 'GET',
    params: {
      page,
    },
  });
};

export const getMultipleEpisodes = async ({
  page,
  id,
}: {
  page: number;
  id: string[];
}) => {
  return await axios.get<Info<Episode[]>>(`${baseUrl}/location/${id}`, {
    params: {
      page,
    },
  });
};
