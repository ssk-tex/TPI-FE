import { useState } from "react";
import { motion } from "framer-motion";
import leftImg from "../assets/left.png";
import rightImg from "../assets/right.png";
import bgImage from "../assets/bg.png"; 
import snaLogo from "../assets/sna.svg";
import { useNavigate } from "react-router-dom";
import { UserList } from "../config/authConfig";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginStore = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const authUser = UserList.find(u => u.username === email && u.psd === password);
    if(authUser) {
      loginStore({username:authUser.username, userRole: authUser.role});
      navigate("/scheme-list")
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
    {/* Background image layer */}
        <div
            className="absolute inset-0 bg-cover bg-center opacity-65 z-0"
            style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md h-[68vh] bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30 flex flex-col justify-between"
    >
        {/* Login Form */}
        <div>
            <img src={snaLogo} width={600} alt="sna decoration" className="h-27 object-contain mb-6" />
          <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg text-green-900">
            WBJIT INTEGRATION
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-violet-900 text-sm mb-1">User Name</label>
                <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/100 border border-white/20 text-blue-900 placeholder-grey/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div>
                <label className="block text-violet-900 text-sm mb-1">Password</label>
                <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-white/100 border border-white/20 text-blue-900 placeholder-grey/80 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition duration-200"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Images at bottom */}
        <div className="flex justify-between mt-4">
          <img src={leftImg} alt="Left decoration" className="h-12 object-contain" />
          <img src={rightImg} alt="Right decoration" className="h-12 object-contain" />
        </div>
      </motion.div>
    </div>
  );
}
