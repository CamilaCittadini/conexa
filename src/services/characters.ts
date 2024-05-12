import axios from 'axios';
import { Character, Info } from './interfaces';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCharacters = async ({
  page,
  name,
  status,
  species,
  gender,
}: {
  page: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
}) => {
  return await axios.get<Info<Character[]>>(`${baseUrl}/character`, {
    params: {
      page,
      ...(name && { name }),
      ...(status && { status }),
      ...(species && { species }),
      ...(gender && { gender }),
    },
  });
};

export const getSingleCharacter = async ({
  page,
  id,
}: {
  page: number;
  id: string;
}) => {
  return await axios.get<Info<Character>>(`${baseUrl}/character/${id}`, {
    params: {
      page,
    },
  });
};

export const getMultipleCharacters = async ({
  page,
  id,
}: {
  page: number;
  id: string[];
}) => {
  return await axios.get<Info<Character[]>>(`${baseUrl}/character/${id}`, {
    params: {
      page,
    },
  });
};
