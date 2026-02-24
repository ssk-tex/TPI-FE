import axios from "axios";
import { URL } from "../environment/env";

const url = URL;

/* -------------------------------- scheme list ----------------------------------------- */
export const getSchemeList = async (payload) => {
  try {
    const response = await axios.get(`${url}/jit/getschemeconfig`);
    return response.data;
  } catch (error) { console.error("Error fetching scheme list:", error);
    throw new Error(error?.response?.data?.message || error.message || "Failed to fetch scheme list");
  }
}
/* ------------------------------- fetch JIT mother-sanction --------------------------------- */
export const fetchJITMSDetails = async () => {
  try {
    const response = await axios.get(`${url}/jit/fetch-mother-sanctions`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------- fetch JIT State allocatoion --------------------------------- */
export const fetchJITSanctionDetails = async () => {
  try {
    const response = await axios.get(`${url}/jit/fetch-state-allocations`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------- Wallet --------------------------------- */
export const fetchWalletDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/getwalletsanctionlist`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ----------------------------- generate wallet sanction --------------------------------- */
// export const generateWalletSanction = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/jit/generate-wallet-sanction`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

/*---------------------------------------- NRLM ------------------------------------------- */

export const fetchFTOList = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/getschemewiseallfto`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}