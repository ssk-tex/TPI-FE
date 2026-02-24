import { useState } from "react"
import PaymentDetails4Nrlm from "./PaymentDetails4Nrlm";
import NrlmAcknowledgementModal from "./NrlmAcknowledgementModal";


export default function NrlmModal ({data, ftoTxnId, ftoId, xmlData}) {
    const [isPayment, setIsPayment] = useState(true);

    const [refNo, setRefNo] = useState([]);

    const [childData, setChildData] = useState("");

  // 👉 এই function টা child এ পাঠানো হবে
  const handleChildData = (data) => {
    setIsPayment(!data.isOpenAck);
    setRefNo(data.refNo);
  };

  const handleChildData2 = (data) => {
    setIsPayment(!data.isOpenAck)
  }


    return(<>
        {isPayment ? (
                <PaymentDetails4Nrlm data={data} xmlData={xmlData} sendData2AckModal={handleChildData} />
            ) : (
                <NrlmAcknowledgementModal ftoId={ftoId} ftoTxnId={ftoTxnId} refNo={refNo} sendData2PaymentPage={handleChildData2} />
            )}
    </>)
}