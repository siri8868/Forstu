import { isAuthenticated } from "../../helpers/AuthHelpers";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getIncompleteFieldsApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getIncompleteFields`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      //   Authorization: accessToken,
    },
    body: JSON.stringify(data),
  });

  //   if (response.status == 401) {
  //     redirectOnTokenExpire();
  //   }

  return response.json();
}
