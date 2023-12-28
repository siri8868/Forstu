import { isAuthenticated } from "../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "./Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getAllUserApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function addUserApi(user) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(user),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}
