import axios from 'axios';

export const getCharacters = () =>
  axios
    .get(
      'https://recruiting.verylongdomaintotestwith.ca/api/{garecinos4}/character'
    )
    .then((response) => response.data);

export const saveCharacters = (characters) => {
  let data = JSON.stringify({
    data: characters,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://recruiting.verylongdomaintotestwith.ca/api/{garecinos4}/character',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios.request(config).then((response) => response.data);
};
