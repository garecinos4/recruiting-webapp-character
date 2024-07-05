import * as api from './api';

export const getCharacters = async () => {
  try {
    const {
      body: { data },
    } = await api.getCharacters();
    return data;
  } catch (ignoredError) {
    return [];
  }
};

export const saveCharacters = async (characters) => {
  try {
    const { statusCode } = await api.saveCharacters(characters);

    return statusCode === 200 ? true : false;
  } catch (ignoredError) {
    return false;
  }
};
