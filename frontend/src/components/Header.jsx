import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Micro Marketplace
      </h1>

      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <span>Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
