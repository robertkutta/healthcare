import axios from "axios";
import {apiURL} from "../../config.js";

export async function getMessages(token) {
  try {
    const request = await axios.get(`${apiURL}/api/messages`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        populate: {
          user: true,
          appointment: {
            populate: {
              doctor: true
            }
          }
        },
        sort: ['createdAt:desc'],
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createMessage(token, message) {
  try {
    const request = await axios.post(`${apiURL}/api/messages`, {data: message}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return request.data.data;
  } catch (e) {
    console.log(e)
  }
}