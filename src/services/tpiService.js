import axios from "axios";
import { dotnetURL, URL } from "../environment/env";

const url = URL;
const dotnetUrl = dotnetURL;

/* -------------------------------- scheme list ----------------------------------------- */
export const getSchemeList = async (payload) => {
  try {
    const response = await axios.get(`${url}/jit/getschemeconfig`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme list:", error);
    throw new Error(error?.response?.data?.message || error.message || "Failed to fetch scheme list");
  }
}

/* ----------------------------- generate wallet sanction --------------------------------- */
export const generateWalletSanction = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/generate-wallet-sanction`, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme list:", error);
    throw new Error(error?.response?.data?.message || error.message || "Failed to fetch scheme list");
  }
}

/* ----------------------- sent sanction to scheme ------------------------------------- */
export const sentSanction = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/sent-sanction-to-scheme`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ------------------------------- fetch JIT mother-sanction --------------------------------- */
export const fetchJITMSDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/fetch-mother-sanctions`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------- fetch JIT State allocatoion --------------------------------- */
export const fetchJITSanctionDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/fetch-state-allocations`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*---------------------------------------------------------------------------------------------------------------------------------- 
                                    NRLM
-----------------------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- Fetch SLS ------------------------------------------------ */
export const fetchSlsDetails = async (sls) => {
  try {
    const response = await axios.get(`${url}/Nrlm/fetch-sls-details?slsCode=${sls}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ------------------------------------------------ Fetch Agency --------------------------------------- */
export const fetchAgencyDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-agency-details`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ------------------------------- fetch mother-sanction --------------------------------- */
export const fetchMSDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-mother-sanctions`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* --------------------------------- fetch ddo allocation ------------------------------ */
export const fetchDdoAllocationDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-ddo-allocations`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------------ fetch budget allocation ------------------------------- */
export const fetchBudgetAllocationDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-sls-budget-head`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------------ fetch COMPONENT ------------------------------- */
export const fetchComponentDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-sls-budget-head`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}


/* ############################# SLS ################################## */
export const slsDetailsSend2Nrlm = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/send-sls-details-nrlm`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# Agency ################################## */
export const agencyDetailsSend2Nrlm = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/send-agency-details-nrlm`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# MS ################################## */
export const msDetailsSend2Nrlm = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/send-mother-sanction-details-nrlm`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# DDO Allocation ################################## */
export const ddoAllocationSend2Nrlm = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/send-ddo-allocation-nrlm`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# Budget Allocation ################################## */
export const budgetAllocationSend = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/send-sls-budget-head-nrlm`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
                                    OMMAS
------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- Fetch SLS ------------------------------------------------ */
export const fetchOmmasSlsDetails = async (sls) => {
  try {
    const response = await axios.get(`${url}/ommas/fetch-sls-details?slsCode=${sls}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ------------------------------------------------ Fetch Agency --------------------------------------- */
export const fetchOmmasAgencyDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/ommas/fetch-agency-details`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ------------------------------- fetch mother-sanction --------------------------------- */
export const fetchOmmasMSDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/ommas/fetch-mother-sanctions`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* --------------------------------- fetch ddo allocation ------------------------------ */
export const fetchOmmasDdoAllocationDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/ommas/fetch-ddo-allocations`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ------------------------------------ fetch budget allocation ------------------------------- */
// export const fetchOmmasBudgetAllocationDetails = async (payload) => {
//   try {
//     const response = await axios.post(`${url}/Nrlm/fetch-sls-budget-head`, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
/* ------------------------------------ fetch COMPONENT ------------------------------- */
export const fetchOmmasComponentDetails = async (payload) => {
  try {
    const response = await axios.post(`${url}/Nrlm/fetch-sls-budget-head`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* ############################# SLS ################################## */
export const slsDetailsSend2Ommas = async (payload) => {
  try {
    const response = await axios.post(`${dotnetUrl}/Ommas/send-sls-details`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# Agency ################################## */
export const agencyDetailsSend2Ommas = async (payload) => {
  try {
    const response = await axios.post(`${url}/ommas/send-agency-details`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# MS ################################## */
export const msDetailsSend2Ommas = async (payload) => {
  try {
    const response = await axios.post(`${dotnetUrl}/ommas/send-mother-sanction-details`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# DDO Allocation ################################## */
export const ddoAllocationSend2Ommas = async (payload) => {
  try {
    const response = await axios.post(`${dotnetUrl}/ommas/send-ddo-allotment-details`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/* ############################# Component ################################## */
export const componentSend2Ommas = async (payload) => {
  try {
    const response = await axios.post(`${dotnetUrl}/ommas/send-component-details`, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
                                                                        MIS 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const fetchMisReport4Fto = async (payload) => {
  try {
    const response = await axios.post(`${url}/jit/fto-mis-report`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
} 