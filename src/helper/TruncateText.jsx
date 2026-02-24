import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TruncateText({ text = "", length = 10 }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const truncated = text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-gray-800">{truncated}</span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="relative left-1/2 -translate-x-1/2 bottom-full mb-2 mt-2
                       bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg
                       w-250 h-screen whitespace-normal break-words line-clamp-3 z-10"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
