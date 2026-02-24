import axios from "axios";
import { URL } from "../environment/env";

const url = URL;

/* -------------------------------------- Fetch SLS ------------------------------------------------ */
// export const fetchSlsDetails = async (sls) => {
//   try {
//     const response = await axios.get(`${url}/Nrlm/fetch-sls-details?slsCode=${sls}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
/* -------------------------------------- Fetch agency ------------------------------------------------ */
// export const fetchAgencyDetails = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/fetch-agency-details`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
/* ------------------------------- fetch mother-sanction --------------------------------- */
// export const fetchMSDetails = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/fetch-mother-sanctions`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
/* --------------------------------- fetch ddo allocation ------------------------------ */
// export const fetchDdoAllocationDetails = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/fetch-ddo-allocations`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
/* ------------------------------------ fetch budget allocation ------------------------------- */
// export const fetchBudgetAllocationDetails = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/fetch-sls-budget-head`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

/*----------------------------- FTO --------------------------------------- */
export const fetchNrlmFtoList = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetchnrlmftolist`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const decodeFtoList = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/decode`, payload, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ---------------------------------------- send ack --------------------------------------- */
export const sendAck = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/sendnrlmftoack`, payload, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme list:", error);
    throw new Error(error?.response?.data?.message || error.message || "Failed to fetch scheme list");
  }
}

/* ------------------------------------------- status list ------------------------------------- */
export const getStatusList = async () => {
  try {
    const response = await axios.get(`${url}/Nrlm/getnrlmftostatuslist`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ------------------------------------------- save fto ------------------------------------------------- */
// export const saveFtoData = async (payload) => {
//   try {
//     const response = await axios.post(`${dotnetUrl}/Fto/save_fto_without_file_xml`, payload, {
//       headers: {
//         "Content-Type": "application/xml"
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching scheme list:", error);
//     throw new Error(error?.response?.data?.message || error.message || "Failed to fetch scheme list");
//   }
// }

/*---------------------------------------- Master Data send ------------------------------------------ */
// export const slsDetailsSend = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/send-sls-details-nrlm`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
// export const agencyDetailsSend = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/send-agency-details-nrlm`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export const msDetailsSend = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/send-mother-sanction-details-nrlm`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export const ddoAllocationSend = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/send-ddo-allocation-nrlm`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export const budgetAllocationSend = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/send-sls-budget-head-nrlm`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }