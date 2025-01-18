import axios from "axios";
import {apiURL} from "../../config.js";

export async function fetchUserData(token) {
  try {
    const request = await axios.get(`${apiURL}/api/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return request.data
  } catch (e) {
    console.log(e)
  }
}

export async function loginAccount({identifier, password}) {
  try {
    const request = await axios.post(`${apiURL}/api/auth/local`, {
      identifier,
      password
    })
    return request.data
  } catch (e) {
    console.log(e)
  }
}

export async function getUsers(token) {
  try {
    const request = await axios.get(`${apiURL}/api/users`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return request.data
  } catch (e) {
    console.log(e)
  }
}

export async function registerAccount({username, email, password}) {
  try {
    const request = await axios.post(`${apiURL}/api/auth/local/register`, {
      username,
      email,
      password,
    })
    return request.data
  } catch (e) {
    console.log(e)
  }
}

export async function updateAccount(token, id, data) {
  try {
    const request = await axios.put(`${apiURL}/api/users/${id}`, data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}