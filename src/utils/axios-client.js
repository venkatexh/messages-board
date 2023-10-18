import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://mapi.harmoney.dev/api/v1",
});

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: process.env.REACT_APP_AUTH_TOKEN,
};

axiosClient.defaults.timeout = 10000;

export async function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export async function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export async function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export async function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
