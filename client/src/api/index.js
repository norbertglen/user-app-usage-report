import axios from 'axios'

const ApiRequest = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 15000, // 15 seconds,
})

export async function addNote({ note, userId }) {
  return await ApiRequest.post("/note", { note, userId })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getUsage(queryParams = {}) {
  const url = Object.entries(queryParams).reduce(
    (acc, cur) => `${acc}&${cur[0]}=${cur[1]}`,
    `/usage/?`
  )
  return await ApiRequest.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getUsers(numberOfUsers) {
  return await ApiRequest.get(`/users/?numberOfUsers=${numberOfUsers}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
