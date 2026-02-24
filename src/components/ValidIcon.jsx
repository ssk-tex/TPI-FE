import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

export const ValidIcon = ({ isValid }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {isValid ? (
        <CheckCircleIcon className="text-green-600 w-5 h-5" />
      ) : (
        <XCircleIcon className="text-red-600 w-5 h-5" />
      )}

      {/* Tooltip */}
      <span
        className="absolute left-1/2 -translate-x-1/2 -top-7 
        bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 whitespace-nowrap"
      >
        {isValid ? "Valid" : "Invalid"}
      </span>
    </motion.div>
  );
};
