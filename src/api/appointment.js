import axios from "axios";
import {apiURL} from "../../config.js";

export async function getAppointments(token) {
  try {
    const request = await axios.get(`${apiURL}/api/appointments`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        populate: {
          patient: true,
          doctor: true
        },
        sort: ['date:asc'],
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}

export async function getAppointment(token, id) {
  try {
    const request = await axios.get(`${apiURL}/api/appointments/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        populate: {
          patient: true,
          doctor: true
        }
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}

export async function createAppointment(token, appointment) {
  try {
    const request = await axios.post(`${apiURL}/api/appointments`, {data: appointment}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}

export async function updateAppointment(token, id, data) {
  try {
    const request = await axios.put(`${apiURL}/api/appointments/${id}`, {data: data}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}