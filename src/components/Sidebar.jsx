// components/Sidebar.jsx
import React, { useState } from "react";
import { FaAngleRight, FaAngleDown, FaDatabase, FaUniversity, FaFileAlt, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSchemeDetailsStore } from "../store/schemeStore";
import { menuDataNrlm, menuDataOmmas } from "../config/config";
import { useAuthStore } from "../store/authStore";

// Icon ম্যাপার
const iconMap = {
  database: <FaDatabase />,
  university: <FaUniversity />,
  file: <FaFileAlt />,
  wallet: <FaWallet />,
};

const Sidebar = () => {
  const {userData} = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData.username);
  const [role, setRole] = useState(userData.userRole);
  const { schemeName } = useSchemeDetailsStore();
  const menuData = (schemeName === 'OMMAS')
    ? menuDataOmmas
    : menuDataNrlm

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (path) => {
    setOpenMenus(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const logoutStore = useAuthStore(state => state.logout);
  const logout = () => {
    logoutStore();
    navigate("/")
  }

  const DynamicMenuItem = ({ item, depth = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const path = item.label;
    const isOpen = openMenus[path];

    const paddingLeft = depth === 0 ? "pl-0" : depth === 1 ? "pl-8" : depth === 2 ? "pl-14" : "pl-20";

    if (hasChildren) {
      return (
        <li className="mb-1">
          <div
            onClick={() => toggleMenu(path)}
            className={`flex items-center justify-between px-2 py-3 rounded-lg hover:bg-cyan-800 hover:bg-opacity-10 cursor-pointer transition-all ${depth === 0 ? "font-medium" : "text-sm"
              }`}
          >
            <div className="flex items-center gap-3">
              {item.icon && <span className="text-cyan-300">{iconMap[item.icon]}</span>}
              <span className={depth === 0 ? "text-sm font-medium" : "text-gray-100"}>
                {item.label}
              </span>
            </div>
            <FaAngleDown
              className={`text-cyan-400 text-sm transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
            />
          </div>

          {/* Children */}
          {isOpen && (
            <ul className={`mt-1 border-l-2 border-cyan-600 ${depth === 0 ? "ml-8 pl-5" : "ml-10 pl-4"} space-y-1`}>
              {item.children.map((child, idx) => (
                <DynamicMenuItem key={idx} item={child} depth={depth + 1} />
              ))}
            </ul>
          )}
        </li>
      );
    }

    // Leaf node (no children)
    return (
      <li>
        <Link
          to={item.to}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded hover:bg-cyan-800 hover:bg-opacity-30 transition-all ${paddingLeft} block`}
        >
          <FaAngleRight className="text-xs text-cyan-400" />
          <span className="text-gray-200 hover:text-white">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="w-80 h-screen bg-gradient-to-b from-blue-950 to-teal-900 text-white fixed top-0 left-0 z-50 shadow-2xl">
      <div className="h-full flex flex-col">

        {/* ===== Top Content ===== */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-8 border-b border-cyan-700 pb-3">
            Dashboard
          </h2>

          {menuData.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 opacity-90">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <DynamicMenuItem key={i} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cyan-700 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold">{user}</p>
              <p className="text-xs text-cyan-400 opacity-80">{role}</p>
            </div>
          </div>

          <button className="text-xs px-3 py-1 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition" onClick={logout}>
            Logout
          </button>
        </div>

      </div>
    </aside>

  );
};

export default Sidebar;