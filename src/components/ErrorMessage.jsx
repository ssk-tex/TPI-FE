// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <strong>Error:</strong> {message}
    </div>
  );
}
