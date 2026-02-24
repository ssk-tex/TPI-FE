import { parseStringPromise } from "xml2js";

export const date_time = (rawDateTime) => {
  const [datePart, timePart] = rawDateTime.split('T');
  const date = datePart.split('-').reverse().join('-'); // YYYY-MM-DD → DD-MM-YYYY
  const time = timePart.split('.')[0]; // HH:MM:SS
  return `${date} ${time}`;
};

export const getColumnSchemewise = (scheme) => {
  switch (scheme) {
    case "NRLM":
      return [
        { key: "id", header: "FTO ID" },
        { key: "ftoNo", header: "FTO NO" },
        { key: "enc_data", header: "Encrypt Data" },
        { key: "time", header: "Received At" },
        { key: "status", header: "Status" },
        { key: 'isAction', header: 'Action' },
      ];

    case "MNREGA":
      return [
        { key: "worker_id", header: "Worker ID" },
        { key: "job_card", header: "Job Card Number" },
        { key: "wage_amount", header: "Wage Amount" },
      ];

    case "OMMAS":
      return [
        { key: "id", header: "FTO ID" },
        { key: "ftoNo", header: "FTO NO" },
        { key: "enc_data", header: "Encrypt Data" },
        { key: "time", header: "Received At" },
        { key: "status", header: "Status" },
        { key: 'isAction', header: 'Action' },
      ];

    case "AWAS":
      return [
        { key: "house_id", header: "House ID" },
        { key: "beneficiary", header: "Beneficiary Name" },
        { key: "installment", header: "Installment Amount" },
      ];

    case "JJM":
      return [
        { key: "village_code", header: "Village Code" },
        { key: "work_code", header: "Work Code" },
        { key: "total_amount", header: "Total Amount" },
      ];

    default:
      return [];
  }
}

export const getDecryptColumnSchemewise = (scheme) => {
  switch (scheme) {
    case "NRLM":
      return [
        { key: 'fin_year', header: 'FIN YEAR' },
        { key: 'txn_unique_id', header: 'TXN ID' },
        { key: 'mother_sanc_order_number', header: 'MOTHERSANCTION NUMBER' },
        { key: 'state_sanc_order_number', header: 'STATESANCTION NUMBER' },
        { key: 'agency_code', header: 'AGENCY CODE' },
        { key: 'ddo_code', header: 'DDO CODE' },
        { key: 'total_gross_amount', header: 'GROSS AMOUNT' },
        { key: 'total_net_amount', header: 'NET AMOUNT' },
        { key: 'category', header: 'Category' },
        { key: 'file_cr_date', header: 'FILE DATE' },
        { key: 'isAction', header: 'Action' },
      ];

    case "MNREGA":
      return [
        { key: "worker_id", header: "Worker ID" },
        { key: "job_card", header: "Job Card Number" },
        { key: "wage_amount", header: "Wage Amount" },
      ];

    case "OMMAS":
      return [
        { key: 'fin_year', header: 'FIN YEAR' },
        { key: 'txn_unique_id', header: 'TXN ID' },
        { key: 'mother_sanc_order_number', header: 'MOTHERSANCTION NUMBER' },
        { key: 'state_sanc_order_number', header: 'STATESANCTION NUMBER' },
        { key: 'sanction_date', header: 'SANCTION DATE' },
        { key: 'agency_code', header: 'AGENCY CODE' },
        { key: 'ddo_code', header: 'DDO CODE' },
        { key: 'total_gross_amount', header: 'GROSS AMOUNT' },
        { key: 'district_lgd_code', header: 'DISTRICT CODE' },
        { key: 'batch_id', header: 'BATCH ID' },
        { key: 'file_cr_date', header: 'FILE DATE' },
        { key: 'isAction', header: 'Action' },
      ];

    case "AWAS":
      return [
        { key: "house_id", header: "House ID" },
        { key: "beneficiary", header: "Beneficiary Name" },
        { key: "installment", header: "Installment Amount" },
      ];

    case "JJM":
      return [
        { key: "village_code", header: "Village Code" },
        { key: "work_code", header: "Work Code" },
        { key: "total_amount", header: "Total Amount" },
      ];

    default:
      return [];
  }
}


export const xml2jsonConversion = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  const traverseNode = (node) => {
    // যদি node child element না থাকে, তাহলে textContent return করো
    if (!node.children || node.children.length === 0) return node.textContent;

    const obj = {};
    for (let child of node.children) {
      const childName = child.nodeName;
      const childValue = traverseNode(child);

      // যদি একই নামের multiple children থাকে, array বানাও
      if (obj[childName]) {
        if (!Array.isArray(obj[childName])) {
          obj[childName] = [obj[childName]];
        }
        obj[childName].push(childValue);
      } else {
        obj[childName] = childValue;
      }
    }
    return obj;
  };

  const root = xml.documentElement; // মূল EXPENDITURE node
  return traverseNode(root);
};
