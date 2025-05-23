import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import {toast} from 'react-toastify';
import { User } from "lucide-react";
import Analyse from "./Insights.jsx";
import Loading from "../components/LoadingOverlay.jsx";
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isuploading, setisuploading] = useState(false);
  const [isanalysing, setisanalysing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");


  const navigate = useNavigate();
  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);


  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //handle drag and drop feature
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };
  const removeFile = () => setSelectedFile(null);

  // Handle file upload on button click
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setisuploading(true);
    setisanalysing(false);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const data = await response.json();
      
      if (response.ok) {
        setisuploading(false);
        console.log("Uploaded file URL:", data.fileUrl);
        alert("File uploaded successfully!");
        toast.success("File uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setSelectedFile(null); 
        setTimeout(() => {
        setisanalysing(true);  // Start analyzing spinner
      }, 1000);
         setTimeout(() => {
      setisanalysing(false);
      setSelectedSection("analyze");
      
    }, 3000);



      } else {
        setisuploading(false);
        toast.error("Upload failed. Please try again.");
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      setisuploading(false);
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      alert("An error occurred while uploading.");
    }

   
  };


  

  


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
    navigate("/"); // Redirect to login page
  };


  
  
  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 bg-opacity-80 backdrop-blur-lg  text-white flex flex-col p-5 shadow-lg">
      <h2 className="text-2xl mb-25 font-bold text-white tracking-wide">
            Fin<span className="text-blue-400">Track</span>
          </h2>
        <nav className="flex flex-col space-y-4">
        <button onClick={() => setSelectedSection("home")} className={`cursor-pointer p-3 rounded ${selectedSection === "home" ? "bg-blue-200 text-black" : "hover:bg-blue-500"}`}>Home</button>
          <button onClick={() => setSelectedSection("upload")} className={`cursor-pointer p-3 rounded ${selectedSection === "upload" ? "bg-blue-200 text-black" : "hover:bg-blue-500"}`}>Upload File</button>
          <button onClick={() => setSelectedSection("analyze")} className={`cursor-pointer p-3 rounded ${selectedSection === "analyze" ? "bg-blue-200 text-black" : "hover:bg-blue-500"}`}>Analyze</button>
          <button onClick={() => setSelectedSection("predict")} className={`cursor-pointer p-3 rounded ${selectedSection === "predict" ? "bg-blue-200 text-black" : "hover:bg-blue-500"}`}>Predict Expense</button>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className=" cursor-pointer flex items-center p-3 hover:bg-red-500 rounded">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
  <User className="w-6 h-6 text-gray-600" />
  {user?.name}
</h1>
          <button onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-700">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        {/* Content Area */}
        {selectedSection === "home" && (
  <div className=" flex flex-col h-full p-6 ">  
   
    <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}! 🎉</h2>
    <p className="text-gray-700 mb-4">
      Get started by uploading your bank statement, analyzing your spending trends, and predicting future expenses.
    </p>

    {/* How-To Guide with Clickable Links */}
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">How to Use the App</h3>
      <ul className="list-disc list-inside text-gray-700 mt-2">
        <li>
          📂 <strong>Upload:</strong>  
          <button 
            className="text-blue-600 hover:underline" 
            onClick={() => setSelectedSection("upload")}
          >
            Upload your bank statement.
          </button>
        </li>
        <li>
          📊 <strong>Analyze:</strong>  
          <button 
            className="text-blue-600 hover:underline" 
            onClick={() => setSelectedSection("analyze")}
          >
            View your expense breakdown.
          </button>
        </li>
        <li>
          🔮 <strong>Predict:</strong>  
          <button 
            className="text-blue-600 hover:underline" 
            onClick={() => setSelectedSection("predict")}
          >
          Get machine learning-based forecasts for future expenses.
          </button>
        </li>
      </ul>
    </div>

    {/* Account Overview */}
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Your Account Overview</h3>
      <p className="text-gray-700"><strong>Name:</strong> {user?.name}</p>
      <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
    </div>

    {/* Summary Cards - Ensure No Overflow */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded-lg shadow w-full">
        <p className="text-lg font-semibold">Total Expenses This Month</p>
        <p className="text-xl font-bold">₹XX,XXX</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow w-full">
        <p className="text-lg font-semibold">Highest Expense Category</p>
        <p className="text-xl font-bold">Food (₹X,XXX)</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg shadow w-full">
        <p className="text-lg font-semibold">Predicted Next Month's Expenses</p>
        <p className="text-xl font-bold">₹XX,XXX</p>
      </div>
    </div>
  </div>
)}






  {/* Content Area */}
  <div className="p-6 overflow-y-auto h-full">
  {selectedSection === "upload" && (
  <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto border border-gray-300">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
    Upload Your Bank Statement File
  </h2>

  {/* Drag & Drop Area */}
  <div
    className={`border-2 border-dashed p-6 rounded-lg text-center ${
      dragging ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-100"
    }`}
    onDragOver={(e) => {
      e.preventDefault();
      setDragging(true);
    }}
    onDragLeave={() => setDragging(false)}
    onDrop={handleDrop}
  >
    {selectedFile ? (
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md">
        <span className="text-gray-700 truncate">{selectedFile.name}</span>
        <button
          onClick={removeFile}
          className="text-red-500 font-semibold hover:text-red-700"
        >
          ❌
        </button>
      </div>
    ) : (
      <>
        <p className="text-gray-600">Drag & drop your file here(.xlsx,.csv)</p>
        <p className="text-gray-500 text-sm mt-1">or</p>
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 mt-3 inline-block rounded-md hover:bg-blue-600 transition">
          Browse File
          <input
            type="file"
            accept=".xlsx, .csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </>
    )}
  </div>

  {/* Upload Button */}
  <button
    className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    onClick={() => handleUpload(selectedFile)}
    disabled={!selectedFile}>
    Upload
  </button>
</div>
)} {/*upload section end*/}

{isuploading && <Loading message="Uploading your file..." />}
{isanalysing && <Loading message="Analyzing your data..." />}

{selectedSection === "analyze" && <Analyse/>}

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
