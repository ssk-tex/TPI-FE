import { FaUniversity, FaGlobe, FaUsers, FaRupeeSign } from "react-icons/fa";
import StatCard from "./StatCard";
import Charts from "./Charts";
import AgencyTable from "./AgencyTable";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { FaApple } from "react-icons/fa6";

export default function Dashboard() {
    const { cssName, cssCode, slsCode, slsName, deptCode, deptName, schemeName } = useSchemeDetailsStore();
    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <StatCard
                    title="Mother Sanction"
                    total="120"
                    icon={<FaUniversity />}
                />

                <StatCard
                    title="State Sanction"
                    total="80"
                    icon={<FaGlobe />}
                />

                <StatCard
                    title="Total FTO"
                    total="35"
                    icon={<FaRupeeSign />}
                />

                <StatCard
                    title="Total Agencies"
                    total="35"
                    icon={<FaUsers />}
                />
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold">
                        SLS & CSS Details
                    </h2>

                    <p className="text-gray-600 mt-2">
                        SLS: {slsCode}
                    </p>

                    <p className="text-gray-600">
                        CSS: {cssCode}
                    </p>
                    <p className="text-gray-600">
                        Scheme: {schemeName}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-1 gap-6 mb-6">
                <Charts />

                {/* <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold">
            SLS & CSS Details
          </h2>

          <p className="text-gray-600 mt-4">
            SLS: 25 Projects
          </p>

          <p className="text-gray-600">
            CSS: 40 Projects
          </p>
        </div> */}
            </div>

            {/* Agency Table */}
            <AgencyTable />
        </div>
    );
}