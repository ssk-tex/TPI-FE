import { motion } from "framer-motion";

export default function StatCard({ title, total, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between"
    >
      <div>
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{total}</p>
      </div>

      <div className="text-3xl text-blue-500">{icon}</div>
    </motion.div>
  );
}