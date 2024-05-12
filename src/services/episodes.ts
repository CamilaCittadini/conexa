import axios from 'axios';
import { Episode } from './interfaces';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getEpisodes = async ({
  page,
  name,
  episode,
}: {
  page: number;
  name?: string;
  episode?: string;
}) => {
  return await axios.get<Episode[]>(`${baseUrl}/episode`, {
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
  return await axios.get<Episode>(`${baseUrl}/episode/${id}`, {
    method: 'GET',
    params: {
      page,
    },
  });
};

export const getMultipleEpisodes = async ({ ids }: { ids: string[] }) => {
  return await axios.get<Episode[]>(`${baseUrl}/episode/${ids}`);
};
