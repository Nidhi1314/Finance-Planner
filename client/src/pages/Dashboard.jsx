import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) return <h2>Loading...</h2>;
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col p-5 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">FinTrack</h2>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => setSelectedSection("download")} className="p-3 hover:bg-blue-500 rounded">Download Statement</button>
          <button onClick={() => setSelectedSection("upload")} className="p-3 hover:bg-blue-500 rounded">Upload File</button>
          <button onClick={() => setSelectedSection("analyze")} className="p-3 hover:bg-blue-500 rounded">Analyze</button>
          <button onClick={() => setSelectedSection("predict")} className="p-3 hover:bg-blue-500 rounded">Predict Expense</button>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center p-3 hover:bg-red-500 rounded">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-lg font-semibold">Welcome, {user?.name}</h1>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        {/* Content Area */}
        {selectedSection==="" && (<div className="p-6 overflow-y-auto h-full">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <p>User ID: {user?.userID}</p>
          <p>Email: {user?.email}</p>
        </div>)}


         {/* Content Area */}
         <div className="p-6 overflow-y-auto h-full">
          {selectedSection === "download" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Download Bank Statement</h2>
              <input
                type="text"
                placeholder="Enter Bank Name"
                className="border p-2 rounded w-full mb-4"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Download Statement</button>
            </div>
          )}

          {selectedSection === "upload" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Upload File</h2>
              <input type="file" className="border p-2 rounded w-full mb-4" />
              <button className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
            </div>
          )}

          {selectedSection === "analyze" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Analyze Expenses</h2>
              <p>View insights and trends from your financial statements.</p>
            </div>
          )}

          {selectedSection === "predict" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Predict Expenses</h2>
              <p>Use machine learning to forecast future expenses.</p>
            </div>
          )}
        </div>
     

      </div>
    </div>
  );
};

export default Dashboard;
