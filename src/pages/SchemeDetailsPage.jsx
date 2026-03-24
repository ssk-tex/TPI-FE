import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
// import { sidebarMenu } from '../assets/data';
import Card from '../components/Card';
import { useSchemeDetailsStore, useSchemeStore } from '../store/schemeStore';
import { useSchemeMenuStore } from '../store/schemeStore';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Module/Dashboard/Dashboard';

const SchemeDetailsPage = () => {
  // const {schemeName} = useSchemeDetailsStore();
  const { cssName, cssCode, slsCode, slsName, deptCode, deptName, schemeName } = useSchemeDetailsStore();
  const setSchemeMenuName = useSchemeMenuStore((state) => state.setSchemeMenuName);
  const navigate = useNavigate();

  const sidebarMenu = [
    { label: "SLS Data", linkTo: `/send-data-to-department/sls` },
    { label: "Agency Data", linkTo: `/send-data-to-department/agency` },
    { label: "Mother Sanction Data", linkTo: `/send-data-to-department/ms` },
    { label: "DDO Allocation Data", linkTo: `/send-data-to-department/ddo-allocation` },
    { label: "SLS Budget Allocation Data", linkTo: `/send-data-to-department/budget-allocation` },
    { label: "FTO List", linkTo: '/fto-list' },
  ];

  function handleCardClick(value) {
    setSchemeMenuName(value);
    sidebarMenu.map((menu) => {
      if (menu.label === value) {
        navigate(menu.linkTo)
      }
    });
  }

  return (
    <div className="flex flex-col h-screen">
      <Header head={cssName} />
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 ml-80 min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
          {/* <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center drop-shadow">
            🌟 Welcome to the Dashboard {schemeName} 🌟
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {
              sidebarMenu.map((menu, i) => (
                <Card key={i} value={menu.label} onSelect={handleCardClick} />
              ))
            }
          </div> */}
          <Dashboard />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SchemeDetailsPage;