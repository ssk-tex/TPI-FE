import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useSchemeDetailsStore } from "../store/schemeStore";
import { getSchemeList } from "../services/schemeService";
import { useEffect, useState } from "react";

export default function SchemePage() {
  const [schemeList, setSchemeList] = useState([]);
  const setSchemeDetails = useSchemeDetailsStore((state) => state.setSchemeDetails);

  const linkTo = '/scheme-details-page'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const resData = await getSchemeList();
        setSchemeList(resData.data);
      } catch (err) {
        console.error("Failed to load schemes:", err.message);
      }
    }

    fetchScheme();

  }, [])

  function handleCardClick(scheme) {
    const selectedSchemeSlsCode = scheme.match(/\(([^)]+)\)/)?.[1]
    const selectedScheme = schemeList.filter(e => e.slsCode === selectedSchemeSlsCode);
    setSchemeDetails(selectedScheme[0]);

    //     const state = useSchemeDetailsStore.getState()
    // console.log("🟢 Current Zustand store:", state)

    navigate(linkTo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center drop-shadow">
        🌟 Government Schemes 🌟
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {schemeList.map((scheme, i) => (
          <Card key={i} value={`${scheme.schemeName} (${scheme.slsCode})`} onSelect={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
