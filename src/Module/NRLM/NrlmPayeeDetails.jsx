import { useEffect, useState } from "react";
import Validation from "../../components/Validation";

export default function NrlmPayeeDetails({ payee, onPayeeDetailsValid }) {
    const deductions = Array.isArray(payee.DEDUCTIONS?.DEDUCTION)
        ? payee.DEDUCTIONS.DEDUCTION
        : payee.DEDUCTIONS
            ? [payee.DEDUCTIONS.DEDUCTION]
            : [];

    const components = Array.isArray(payee.COMPONENTS?.COMPONENT)
        ? payee.COMPONENTS.COMPONENT
        : payee.COMPONENTS
            ? [payee.COMPONENTS.COMPONENT]
            : [];

    const validateNetAmount = (payee) => {
        const gross = Number(payee.GROSSAMOUNT) || 0;
        const deduction = Number(deductions.reduce((t, x) => t + Number(x.AMOUNT), 0)) || 0;
        const net = gross - deduction;
        return net === Number(payee.NETAMOUNT);   // true/false return করবে
    };

    const [validationResults, setValidationResults] = useState({});

    const handleValidation = (field, status) => {
        setValidationResults(prev => ({
            ...prev,
            [field]: status,
        }));
    };

    const allPayeeValid = Object.values(validationResults).every(v => v === true);
    const netAmtValid = validateNetAmount(payee);

    useEffect(() => {
        onPayeeDetailsValid({ isPayeeValid: allPayeeValid, isNetAmountValid: netAmtValid });
    }, [allPayeeValid, netAmtValid]);


    return (
        <div className="grid grid-cols-2 gap-6 mb-8">

            {/* Payee Details */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="font-semibold text-lg mb-3 text-orange-600">Payee Details</h2>
                <ul className="space-y-1 text-sm">
                    <Validation onValidate={handleValidation} field="PAYEE_NAME" label="Name" value={payee.PAYEE_NAME} />
                    <Validation onValidate={handleValidation} field="PAN_NO" label="PAN" value={payee.PAN_NO} />
                    <Validation onValidate={handleValidation} field="ACCOUNT_NO" label="Account No" value={payee.ACCOUNT_NO} />
                    <Validation onValidate={handleValidation} field="IFSC_CODE" label="IFSC" value={payee.IFSC_CODE} />
                    <Validation onValidate={handleValidation} field="PAYEEUNIQUEID" label="PAYEE UNIQUE ID" value={payee.PAYEEUNIQUEID} />
                    <Validation onValidate={handleValidation} field="GROSSAMOUNT" label="Gross" value={payee.GROSSAMOUNT} />
                    <Validation onValidate={handleValidation} field="NETAMOUNT" label="Net" value={payee.NETAMOUNT} />
                    {!validateNetAmount(payee) && (
                        <p className="text-red-600 text-sm mt-1">
                            Net must be equal to Gross minus Deduction
                        </p>
                    )}
                </ul>
            </div>

            {/* Components & Deductions */}
            <div className="bg-white rounded-2xl shadow">
                <div className="bg-white p-2 rounded-2xl">

                    <h2 className="font-semibold text-lg mb-3 text-blue-700">Components</h2>
                    <table className="w-full border text-sm rounded-2xl">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="p-2 border text-left">Component ID</th>
                                <th className="p-2 border text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="max-h-40 overflow-y-auto">
                            {components.map((c, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-2 border">{c.COMPO_ID}</td>
                                    <td className="p-2 border text-right">{c.COMPO_AMOUNT}</td>
                                </tr>
                            ))}
                            <tr className="bg-blue-100 font-semibold">
                                <td className="p-2 border text-left">Total</td>
                                <td className="p-2 border text-right">
                                    {components.reduce((t, x) => t + Number(x.COMPO_AMOUNT), 0)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow">
                    <h2 className="font-semibold text-lg mb-3 text-red-600">Deductions</h2>
                    <table className="w-full border text-sm rounded-2xl">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="p-2 border text-left">Name</th>
                                <th className="p-2 border text-left">Type</th>
                                <th className="p-2 border text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="max-h-40 overflow-y-auto">
                            {deductions.map((d, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-2 border">{d.DEDNAME}</td>
                                    <td className="p-2 border">{d.DEDTYPE}</td>
                                    <td className="p-2 border text-right">{d.AMOUNT}</td>
                                </tr>
                            ))}
                            <tr className="bg-red-100 font-semibold">
                                <td className="p-2 border" colSpan={2}>
                                    Total
                                </td>
                                <td className="p-2 border text-right">
                                    {deductions.reduce((t, x) => t + Number(x.AMOUNT), 0)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
