import { validateDate } from "./validateDate";

const notEmpty = (value) =>
    value !== null && value !== undefined && value !== "";

export const validationRules = {
    FIN_YEAR: (value) => notEmpty(value) && /^\d{4}-\d{4}$/.test(value),  

    CSSCODE: (value) => notEmpty(value) && value.length >= 3,       

    SLSCODE: (value) => notEmpty(value) && /^[A-Z0-9]+$/.test(value), 

    MOTHERSANCORDERNUMBER: (value) => notEmpty(value),  

    STATESANCORDERNUMBER: (value) => notEmpty(value), 

    FILECRDATE: (value) => validateDate(value),

    AGENCYCODE: (value) => notEmpty(value),

    DDOCODE: (value) => notEmpty(value),

    TREASCODE: (value) => notEmpty(value),

    TOTALGROSSAMOUNT: (value) => notEmpty(value),

    TOTALNETAMOUNT: (value) => notEmpty(value),

    PAYEECOUNT: (value) => notEmpty(value),

    CENTERHEAD: (value) => notEmpty(value),
    
    STATEHEAD: (value) => notEmpty(value),
    
    TOTALALLOTMENT: (value) => notEmpty(value),
 
    CATEGORY: (value) => notEmpty(value),
    
    PAYEE_NAME: (value) => notEmpty(value) && value.length <= 40 && /^[A-Za-z]+( [A-Za-z]+)*$/.test(value), 

    PAN_NO: (value) => notEmpty(value),

    ACCOUNT_NO: (value) => notEmpty(value),

    IFSC_CODE: (value) => notEmpty(value),

    BILLNUMBER: (value) => notEmpty(value),

    BILLDATE: (value) => notEmpty(value),

    GROSSAMOUNT: (value) => notEmpty(value),

    NETAMOUNT: (value) => notEmpty(value),

    PAYEEUNIQUEID: (value) => notEmpty(value),

    TXNUNIQUEID: (value) => notEmpty(value),

    BATCHID: (value) => notEmpty(value),
};
