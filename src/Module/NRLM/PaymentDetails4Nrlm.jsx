import React, { useEffect, useState } from "react";
import Btn from "../../components/Btn";
import Validation from "../../components/Validation";
import { formatCurrency } from "../../helper/formatters";
import NrlmPayeeNavigator from "./NrlmPayeeNavigator";
// import { saveFtoData } from "../../services/nrlmService";

export default function PaymentDetails4Nrlm({ data, sendData2AckModal, xmlData }) {

  const [btnLabel, setBtnLabel] = useState("Save FTO");
  const [loading, setLoading] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  const [validationResults, setValidationResults] = useState({});
  const [isShowBtn, setIsShowBtn] = useState(false);

  const handleValidation = (field, status) => {
    setValidationResults(prev => ({
      ...prev,
      [field]: status,
    }));
  };

  if (!data) return <p className="text-center text-gray-500">No data found</p>;

  const payee = data.PAYEEDETAILS?.PAYEE || {};

  // const xml = xmlData;

  const payeeList = Array.isArray(data.PAYEEDETAILS?.PAYEE)
    ? data.PAYEEDETAILS.PAYEE
    : data.PAYEEDETAILS.PAYEE
      ? [data.PAYEEDETAILS.PAYEE]
      : [];

  const refNoList = payeeList.map(item => ({
    refNo: item.REFERENCE_NO
  }));

  function handleClick() {
    sendData2AckModal({ isOpenAck: true, refNo: refNoList })
  }

  const handleValidationDataForButton = (data) => {
    // console.log('payee valid data', validData);
       if (!data) {
        console.warn("Payee validation data missing!");
        return;
    }

    const { isPayeeValid, isNetAmountValid } = data;
    
    const allValid = Object.values(validationResults).every(v => v === true);

    if (allValid === false || isPayeeValid === false || isNetAmountValid === false) {
      setIsShowBtn (true)
    }
  }


  // async function saveFto() {
  //   alert('save fto')
  //   // saveFtoData
  //   // console.log('fto xml data', xml);
  //   try {
  //     const res = await saveFtoData(xml);
  //     console.log('RESPONSE after saving fto', res);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      <div className="bg-white p-6 my-6 rounded-2xl shadow">
        <h1 className="text-3xl my-4 font-bold text-center text-blue-700">
          Payment Details Report
        </h1>
        <p ><b>Title:</b> {data.TITLE}</p>
        <p className="mt-2"><b>Description:</b> {data.DESCRIPTION}</p>
      </div>

      {/* Top Summary Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-blue-600">Basic Info</h2>
          <ul className="space-y-2 text-sm">
            <Validation onValidate={handleValidation} field="FIN_YEAR" label="Financial Year" value={data.FIN_YEAR} />
            <Validation onValidate={handleValidation} field="CSSCODE" label="CSS Code" value={data.CSSCODE} />
            <Validation onValidate={handleValidation} field="SLSCODE" label="SLS Code" value={data.SLSCODE} />
            <Validation onValidate={handleValidation}
              field="MOTHERSANCORDERNUMBER"
              label="Mother Sanction No"
              value={data.MOTHERSANCORDERNUMBER}
            />
            <Validation onValidate={handleValidation}
              field="STATESANCORDERNUMBER"
              label="State Sanction No"
              value={data.STATESANCORDERNUMBER}
            />
            <Validation onValidate={handleValidation} field="FILECRDATE" label="File Created Date" value={data.FILECRDATE} />
          </ul>
        </div>


        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-green-600">Agency & Payment</h2>
          <ul className="space-y-1 text-sm">
            <Validation onValidate={handleValidation} field="AGENCYCODE" label="Agency Code" value={data.AGENCYCODE} />
            <Validation onValidate={handleValidation} field="DDOCODE" label="DDO Code" value={data.DDOCODE} />
            <Validation onValidate={handleValidation} field="TREASCODE" label="Treasury Code" value={data.TREASCODE} />
            <Validation onValidate={handleValidation} field="TOTALGROSSAMOUNT" label="Total Gross" value={data.TOTALGROSSAMOUNT} />
            <Validation onValidate={handleValidation} field="TOTALNETAMOUNT" label="Total Net" value={data.TOTALNETAMOUNT} />
            <Validation onValidate={handleValidation} field="PAYEECOUNT" label="Payee Count" value={data.PAYEECOUNT} />
            <Validation onValidate={handleValidation} field="TXNUNIQUEID" label="Txn Unique Id" value={data.TXNUNIQUEID} />
            <Validation onValidate={handleValidation} field="BATCHID" label="Batch Id" value={data.BATCHID} />
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-purple-600">Allotment Summary</h2>
          <ul className="space-y-1 text-sm">
            <Validation onValidate={handleValidation} field="CENTERHEAD" label="Center Head" value={data.ALLOTMENTDETAIL.CENTERHEAD} />
            <Validation onValidate={handleValidation} field="STATEHEAD" label="State Head" value={data.ALLOTMENTDETAIL.STATEHEAD} />
            <Validation onValidate={handleValidation} field="TOTALALLOTMENT" label="Total Allotment" value={formatCurrency(data.ALLOTMENTDETAIL.TOTALALLOTMENT)} />
            <Validation onValidate={handleValidation} field="CATEGORY" label="Category" value={data.CATEGORY} />
            <Validation onValidate={handleValidation} field="BILLNUMBER" label="Bill No" value={data.BILLNUMBER} />
            <Validation onValidate={handleValidation} field="BILLDATE" label="Bill Date" value={data.BILLDATE} />
          </ul>
        </div>
      </div>

      <NrlmPayeeNavigator payees={payeeList} isPayeeValid={handleValidationDataForButton} />

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* <Btn label={btnLabel} variant="success" onClick={saveFto} /> */}
        {/* <Btn label="FTO Acknowledgement" variant="danger" onClick={handleClick} disabled={allValid} /> */}
        {isShowBtn && (
          <Btn
            label="FTO Acknowledgement"
            variant="danger"
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}
