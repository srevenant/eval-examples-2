import axios from 'axios';

export async function getStarshipDetail(id) {
  return await axios
    .get('https://swapi.co/api/starships/' + id + '/')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

export function getPilots(url = null) {
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
export async function getStarship(page = null) {
  let url = 'https://swapi.co/api/starships/';
  if (page !== null) {
    url += '?page=' + page;
  }
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
}

export async function getAllPilots(actionList) {
  return await axios.all(actionList).then(response => {
    return response;
  });
}
