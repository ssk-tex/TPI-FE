import { useState } from "react";

export default function Tabs({ contentsData, bodyWidth = "100%" }) {
  // যদি parent থেকে data না আসে তাহলে default tabs থাকবে
  const tabs = contentsData || [
    { id: 1, title: "Home", content: <div>Welcome to the Home tab!</div> },
    { id: 2, title: "Profile", content: <div>Here is your Profile information.</div> },
    { id: 3, title: "Settings", content: <div>Adjust your settings here.</div> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || null);

  return (
    <div className="w-full max-w-2xl mt-2 p-4 rounded-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 
              ${activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="p-4 bg-white rounded-lg shadow-md "
        style={{ width: bodyWidth }}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}