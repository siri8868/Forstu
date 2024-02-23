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

export async function getPersonalInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getPersonalInfo`, {
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

export async function getAddressInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getAddressInfo`, {
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

export async function getOtherInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getOtherInfo`, {
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

export async function getcurrentcourseInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getcurrentcourseInfo`, {
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

export async function getQualificationInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getQualificationInfo`, {
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

export async function getHostelDetailsInfoApi(data) {
  // console.log("data", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getHostelDetailsInfo`, {
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

export async function submitFormDataApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/submitFormData`, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
      //   Authorization: accessToken,
    },
    body: data,
  });

  //   if (response.status == 401) {
  //     redirectOnTokenExpire();
  //   }

  return response.json();
}
