import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NrlmPayeeDetails from "./NrlmPayeeDetails";

export default function NrlmPayeeNavigator({ payees, isPayeeValid }) {
  const [index, setIndex] = useState(0);
  const [valid, setValid] = useState(null);

  const next = () => {
    if (index < payees.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const validateRes = (data) => {
    setValid(data);
  }

  useEffect(() => {
    if (valid !== null && valid !== undefined) {
      isPayeeValid(valid);
    }
  }, [valid])

  return (
    <div className="w-full">

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-300"
        >
          ◀ Prev
        </button>

        <div className="font-semibold text-gray-700">
          Payee {index + 1} / {payees.length}
        </div>

        <button
          onClick={next}
          disabled={index === payees.length - 1}
          className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-300"
        >
          Next ▶
        </button>
      </div>

      {/* Animated Wrapper */}
      <motion.div
        key={index}
        initial={{ opacity: 0, rotateY: -30 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: 30 }}
        transition={{ duration: 0.4 }}
      >
        <NrlmPayeeDetails payee={payees[index]} onPayeeDetailsValid={validateRes} />
      </motion.div>
    </div>
  );
}