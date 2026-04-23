// export const LOCAL_UTILS_URL = `http://127.0.0.1:2031/api/v1`;
// export const LOCAL_URL = `http://127.0.0.1:7080/api/v1`;

// export const LIVE_URL = "https://ifms.wb.gov.in/wbjitintegration-live/v1";
// export const UTILS_URL = "https://train-ifms.wb.gov.in/wbjit_tpi_utils/v1";


//  -- dev -- 
// const LSB = "http://10.176.100.103:2031/api/v1";
const LSB = "http://127.0.0.1:2031/api/v1";
const dotnetLSB = "http://localhost:5152/api/v1";

// -- uat --
const PSB = "https://train-ifms.wb.gov.in/wbjit_integration_tpi_utils/v1"; 
// const dotnetPSB = "http://train-ifms.wb.gov.in/wbjitintegration-uat/api/v1";
// const dotnetPSB = "https://ifms.wb.gov.in/wbjitintegration-live/api/v1";
const dotnetPSB = "http://localhost:5152/api/v1";

export const isDev = false;

export const URL = isDev ? LSB : PSB;
export const dotnetURL = isDev ? dotnetLSB : dotnetPSB;