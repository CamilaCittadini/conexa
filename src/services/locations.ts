import axios from 'axios';
import { Info, Location } from './interfaces';

const baseUrl = process.env.BASE_URL;

export const getLocations = async ({
  page,
  name,
  type,
  dimension,
}: {
  page: number;
  name?: string;
  type?: string;
  dimension?: string;
}) => {
  return await axios.get<Info<Location>>(`${baseUrl}/location`, {
    params: {
      page,
      ...(name && { name }),
      ...(type && { type }),
      ...(dimension && { dimension }),
    },
  });
};

export const getSingleLocation = async ({
  page,
  id,
}: {
  page: number;
  id: string;
}) => {
  return await axios.get<Info<Location[]>>(`${baseUrl}/location/${id}`, {
    params: {
      page,
    },
  });
};

export const getMultipleLocations = async ({
  page,
  id,
}: {
  page: number;
  id: string[];
}) => {
  return await axios.get<Info<Location[]>>(`${baseUrl}/location/${id}`, {
    params: {
      page,
    },
  });
};
