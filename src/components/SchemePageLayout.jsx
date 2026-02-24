import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useSchemeDetailsStore } from '../store/schemeStore';
import { motion } from "framer-motion";

export default function SchemePageLayout({children }) {
    const {cssName, cssCode, slsCode, slsName, deptCode, deptName, centreShare, stateShare, schemeName} = useSchemeDetailsStore();
    const cs = centreShare.split('%')[0];
    const ss = stateShare.split('%')[0];

    return (<div className="flex flex-col h-screen">
    <Header head={cssName} />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-80 min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
        <div className="text-center py-10 bg-gradient-to-b from-indigo-50 via-white to-white rounded-2xl shadow-md">
          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-indigo-800 tracking-wide drop-shadow-md flex justify-center items-center gap-2 font-sans"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              role="img"
              aria-label="spark"
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              🌟
            </motion.span>
            <span className="text-indigo-600">Welcome to</span>
            <span className="text-indigo-900">{schemeName}</span>
            <motion.span
              role="img"
              aria-label="spark"
              initial={{ rotate: 20 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              🌟
            </motion.span>
          </motion.h1>
          {/* Left, Progress Bar, Right */}
          <motion.div
            className="mt-6 flex flex-col md:flex-row items-center justify-between text-gray-800 font-medium md:px-6 gap-4 md:gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            {/* Left Side */}
            <div className="md:w-1/3 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start text-sm md:text-base font-serif">
              <span className="font-semibold text-indigo-700 mr-1">CSS:</span>
              <span className="leading-tight text-center"> {cssName}</span>
            </div>

            {/* Center Progress Bar */}
            <div className="w-full md:w-1/3 mx-3">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-semibold text-indigo-700 whitespace-nowrap mr-2">
                  Central Share
                </span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                  <motion.div
                    className="bg-indigo-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${cs}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    title={`${cssName}: ${cs}%`}
                  ></motion.div>
                  <motion.div
                    className="bg-yellow-400 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${ss}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    title={`${slsName}: ${ss}%`}
                  ></motion.div>
                </div>
                <span className="text-xs md:text-sm font-semibold text-yellow-600 whitespace-nowrap ml-2">
                  State Share
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1 font-sans">
                {cs}% / {ss}%
              </div>

              {/* Department section */}
              <div className="mt-5 text-sm md:text-base font-serif text-indigo-800">
                <span className="font-semibold">Department:</span>{" "}
                <span>{deptName}</span>
              </div>

              {/* Divider Line */}
              <motion.div
                className="mt-3 h-1 w-100 bg-indigo-500 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Right Side */}
            <div className="md:w-1/3 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end text-sm md:text-base font-serif">
              <span className="font-semibold text-yellow-600">SLS:</span>
              <span className="leading-tight">
                {slsName}
              </span>
            </div>
          </motion.div>

        </div>

        {children}
       
      </main>
    </div>
    <Footer />
  </div>)
}