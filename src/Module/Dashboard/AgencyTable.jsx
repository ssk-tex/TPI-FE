export default function AgencyTable() {
  const agencies = [
    { id: 1, name: "Agency A", location: "Delhi" },
    { id: 2, name: "Agency B", location: "Mumbai" },
    { id: 3, name: "Agency C", location: "Kolkata" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Agency List
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.id} className="border-t">
              <td className="py-2">{agency.id}</td>
              <td>{agency.name}</td>
              <td>{agency.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}