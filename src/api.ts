export const endpoint = "https://rickandmortyapi.com/api/character";

export const fetchData = (endpoint: string) =>
  fetch(endpoint).then((res) => res.json());
