import { useNavigate } from "react-router-dom";

export default function Card({ value, onSelect }) {
  
  function go2SchemePage(){
    if (onSelect) onSelect(value)
  }
  
  return (
    <div className="w-[20vw] h-[20vh] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-indigo-100">
      <h2 className="text-xl font-semibold text-indigo-800">{value}</h2>
        <button
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-800 transition inline-flex items-center cursor-pointer shadow-md"
            onClick={go2SchemePage}
            >
            Explore Details
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M3 12h18" />
            </svg>
        </button>
    </div>
  );
}
