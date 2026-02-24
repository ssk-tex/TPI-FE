import axios from "axios";
import { URL } from "../environment/env";

const url = URL;

export const fetchOmmasFtoList = async () => {
  try {
    const response = await axios.get(`${url}/ommas/fetchommasftolist`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const decryptFtoList = async (payload) => {
  try {
    const response = await axios.post(`${url}/ommas/decrypt`, payload, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
