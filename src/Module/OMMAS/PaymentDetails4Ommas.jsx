import React from "react";
import Btn from "../components/Btn";

export default function PaymentDetails4Ommas({ data }) {
  console.log('payment details page data', data);
  
  if (!data) return <p className="text-center text-gray-500">No data found</p>;

  const payee = data.PAYEEDETAILS?.PAYEE?.[0];
  const deductions = payee?.DEDUCTIONS?.DEDUCTION || [];
  const components = payee?.COMPONENTS?.COMPONENT || [];

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        Payment Details Report
      </h1>

      {/* Top Summary Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-blue-600">Basic Info</h2>
          <ul className="space-y-1 text-sm">
            <li><b>Financial Year:</b> {data.FIN_YEAR}</li>
            <li><b>District LGD Code:</b> {data.DISTRICT_LGD_CODE}</li>
            <li><b>CSS Code:</b> {data.CSS_CODE}</li>
            <li><b>SLS Code:</b> {data.SLS_CODE}</li>
            <li><b>Sanction Date:</b> {data.SANCTION_DATE}</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-green-600">Agency & Payment</h2>
          <ul className="space-y-1 text-sm">
            <li><b>Agency Code:</b> {data.AGENCY_CODE}</li>
            <li><b>DDO Code:</b> {data.DDO_CODE}</li>
            <li><b>Category:</b> {data.CATEGORY}</li>
            <li><b>Gross:</b> ₹{data.TOTAL_GROSS_AMOUNT.toLocaleString()}</li>
            <li><b>Net:</b> ₹{data.TOTAL_NET_AMOUNT.toLocaleString()}</li>
            <li><b>Payee Count:</b> {data.PAYEE_COUNT}</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-purple-600">Allotment Summary</h2>
          <ul className="space-y-1 text-sm">
            <li><b>Center Head:</b> {data.ALLOTMENTDETAIL.CENTER_HEAD}</li>
            <li><b>State Head:</b> {data.ALLOTMENTDETAIL.STATE_HEAD}</li>
            <li><b>Total Allotment:</b> ₹{data.ALLOTMENTDETAIL.TOTAL_ALLOTMENT}</li>
            <li><b>CS:</b> ₹{data.ALLOTMENTDETAIL.ALLOTMENT_CS}</li>
            <li><b>SS:</b> ₹{data.ALLOTMENTDETAIL.ALLOTMENT_SS}</li>
            <li><b>Topup:</b> ₹{data.ALLOTMENTDETAIL.TOPUP}</li>
          </ul>
        </div>
      </div>

      {/* Middle Section: Payee + Abstract side by side */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-orange-600">Payee Details</h2>
          <ul className="space-y-1 text-sm">
            <li><b>Name:</b> {payee.PAYEE_NAME}</li>
            <li><b>PAN:</b> {payee.PAN_NO}</li>
            <li><b>Account No:</b> {payee.ACCOUNT_NO}</li>
            <li><b>IFSC:</b> {payee.IFSC_CODE}</li>
            <li><b>Bill No:</b> {payee.BILL_NUMBER}</li>
            <li><b>Bill Date:</b> {payee.BILL_DATE}</li>
            <li><b>Gross:</b> ₹{payee.GROSS_AMOUNT}</li>
            <li><b>Net:</b> ₹{payee.NET_AMOUNT}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-indigo-600">Abstract</h2>
          <p><b>Title:</b> {data.ABSTRACTS.ABSTRACT.TITLE}</p>
          <p className="mt-2"><b>Description:</b> {data.ABSTRACTS.ABSTRACT.DESCRIPTION}</p>
        </div>
      </div>

      {/* Bottom Section: Components & Deductions in landscape view */}
      <div className="grid grid-cols-2 gap-6">
        {/* Components */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-blue-700">Components</h2>
          <table className="w-full border text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-2 border text-left">Component ID</th>
                <th className="p-2 border text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {components.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{c.COMPO_ID}</td>
                  <td className="p-2 border text-right">{c.COMPO_AMOUNT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold text-lg mb-3 text-red-600">Deductions</h2>
          <table className="w-full border text-sm">
            <thead className="bg-red-50">
              <tr>
                <th className="p-2 border text-left">Name</th>
                <th className="p-2 border text-left">Type</th>
                <th className="p-2 border text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {deductions.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{d.DED_NAME}</td>
                  <td className="p-2 border">{d.DED_TYPE}</td>
                  <td className="p-2 border text-right">{d.AMOUNT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* ✅ Action Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <Btn label="Save FTO" variant="primary" onClick={() => alert("Going Back...")} />
        <Btn label="Send FTO To JIT" variant="success" onClick={() => alert("Downloading PDF...")} />
        <Btn label="Reject FTO" variant="danger" onClick={() => alert("Deleting Record...")} />
      </div>
    </div>
  );
}
