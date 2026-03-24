import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", mother_sanction: 10, state_sanction: 5, fto:12 },
  { name: "Feb", mother_sanction: 15, state_sanction: 8, fto:14  },
  { name: "Mar", mother_sanction: 20, state_sanction: 12, fto:27  },
  { name: "Apr", mother_sanction: 18, state_sanction: 15, fto:22  },
];

export default function Charts() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Sanction Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="mother_sanction" fill="#3b82f6" />
          <Bar dataKey="state_sanction" fill="#10b981" />
          <Bar dataKey="fto" fill="#53b910" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}