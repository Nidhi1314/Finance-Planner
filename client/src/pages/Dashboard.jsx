
//  import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
// import {toast} from 'react-toastify';
// import { User } from "lucide-react";
// import Predict from "./Predict.jsx";
// import Analyse from "./Analysis.jsx";
// import  sendToML  from "../../../server/routes/mlRoutes.js";
// import Loading from "../components/LoadingOverlay.jsx";


// const Dashboard = () => { 
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isuploading, setisuploading] = useState(false);
//   const [isanalysing, setisanalysing] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("home");
//   const [predictionData, setPredictionData] = useState(null);
//   const [processedData, setProcessedData] = useState(null);
//   const [duration, setDuration] = useState("3months"); // default: 3 months



//   const navigate = useNavigate();
//   useEffect(() => {
//     console.log("User Data:", user);
//   }, [user]);


//   const [dragging, setDragging] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   //handle drag and drop feature
//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     const file = event.dataTransfer.files[0];
//     if (file) setSelectedFile(file);
//   };
//   const removeFile = () => setSelectedFile(null);

//   // Handle file upload on button click
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     setisuploading(true);
//     setisanalysing(false);

//     try {
//       const response = await fetch("http://localhost:5000/api/upload", {
//         method: "POST",
//         body: formData,
//         mode: "cors",
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         setisuploading(false);
//         console.log("Uploaded file URL:", data.fileUrl);
//         alert("File uploaded successfully!");
//         toast.success("File uploaded successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         });

//         setSelectedFile(null); 
//         setTimeout(() => {
//         setisanalysing(true);  // Start analyzing spinner
//       }, 3000);

//       try{
//         const mlResponse= await sendToML(data.fileUrl);
//         console.log("ML prediction response",mlResponse);

//         setPredictionData(mlResponse.forecast);
//         setProcessedData(mlResponse.processed_data);
//         setisanalysing(false);
//         setSelectedSection("analyze");
//       }catch(mlerror){
//         console.error("error in ML prediction",mlerror);
//         setisanalysing(false);
//       }
         
//       } else {
//         setisuploading(false);
//         toast.error("Upload failed. Please try again.");
//         alert("Upload failed: " + data.message);
//       }
//     } catch (error) {
//       setisuploading(false);
//       console.error("Upload error:", error);
//       toast.error("Upload failed. Please try again.");
//       alert("An error occurred while uploading.");
//     }

   
//   };


  

  


//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("token"); // Get token from localStorage

//       if (!token) {
//         navigate("/login"); // Redirect to login if no token
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/users/dashboard", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Send token in the header
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Unauthorized");
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching dashboard:", error);
//         localStorage.removeItem("token"); // Remove invalid token
//         navigate("/login"); // Redirect to login
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, [navigate]);

//   if (loading) return <h2>Loading...</h2>;
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     navigate("/"); // Redirect to login page
//   };


  
  
//   return (
//     <div className="flex h-screen bg-gray-100 relative">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 bg-opacity-80 backdrop-blur-lg  text-white flex flex-col p-5 shadow-lg">
//         <h2 className="text-2xl mb-25 font-bold text-white tracking-wide">
//           Fin<span className="text-blue-400">Track</span>
//         </h2>
//         <nav className="flex flex-col space-y-4">
//           <button
//             onClick={() => setSelectedSection("home")}
//             className={`cursor-pointer p-3 rounded ${
//               selectedSection === "home"
//                 ? "bg-blue-200 text-black"
//                 : "hover:bg-blue-500"
//             }`}
//           >
//             Home
//           </button>
//           <button
//             onClick={() => setSelectedSection("upload")}
//             className={`cursor-pointer p-3 rounded ${
//               selectedSection === "upload"
//                 ? "bg-blue-200 text-black"
//                 : "hover:bg-blue-500"
//             }`}
//           >
//             Upload File
//           </button>
//           <button
//             onClick={() => setSelectedSection("analyze")}
//             className={`cursor-pointer p-3 rounded ${
//               selectedSection === "analyze"
//                 ? "bg-blue-200 text-black"
//                 : "hover:bg-blue-500"
//             }`}
//           >
//             Analyze
//           </button>
//           <button
//             onClick={() => setSelectedSection("predict")}
//             className={`cursor-pointer p-3 rounded ${
//               selectedSection === "predict"
//                 ? "bg-blue-200 text-black"
//                 : "hover:bg-blue-500"
//             }`}
//           >
//             Predict Expense
//           </button>
//         </nav>
//         <div className="mt-auto">
//           <button
//             onClick={handleLogout}
//             className=" cursor-pointer flex items-center p-3 hover:bg-red-500 rounded"
//           >
//             <FaSignOutAlt className="mr-2" /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <div className="flex justify-between items-center bg-white shadow p-4">
//           <h1 className="text-lg font-semibold flex items-center gap-2">
//             <User className="w-6 h-6 text-gray-600" />
//             {user?.name}
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="cursor-pointer text-red-500 hover:text-red-700"
//           >
//             <FaSignOutAlt size={24} />
//           </button>
//         </div>

//         {/* Content Area */}
//         {selectedSection === "home" && (
//           <div className=" flex flex-col h-full p-6 ">
//             <h2 className="text-2xl font-bold mb-4">
//               Welcome, {user?.name}! 🎉
//             </h2>
//             <p className="text-gray-700 mb-4">
//               Get started by uploading your bank statement, analyzing your
//               spending trends, and predicting future expenses.
//             </p>

//             {/* How-To Guide with Clickable Links */}
//             <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//               <h3 className="text-lg font-semibold">How to Use the App</h3>
//               <ul className="list-disc list-inside text-gray-700 mt-2">
//                 <li>
//                   📂 <strong>Upload:</strong>
//                   <button
//                     className="text-blue-600 hover:underline"
//                     onClick={() => setSelectedSection("upload")}
//                   >
//                     Upload your bank statement.
//                   </button>
//                 </li>
//                 <li>
//                   📊 <strong>Analyze:</strong>
//                   <button
//                     className="text-blue-600 hover:underline"
//                     onClick={() => setSelectedSection("analyze")}
//                   >
//                     View your expense breakdown.
//                   </button>
//                 </li>
//                 <li>
//                   🔮 <strong>Predict:</strong>
//                   <button
//                     className="text-blue-600 hover:underline"
//                     onClick={() => setSelectedSection("predict")}
//                   >
//                     Get machine learning-based forecasts for future expenses.
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             {/* Account Overview */}
//             <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold">Your Account Overview</h3>
//               <p className="text-gray-700">
//                 <strong>Name:</strong> {user?.name}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Email:</strong> {user?.email}
//               </p>
//             </div>

//             {/* Summary Cards - Ensure No Overflow */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//               <div className="bg-blue-100 p-4 rounded-lg shadow w-full">
//                 <p className="text-lg font-semibold">
//                   Total Expenses This Month
//                 </p>
//                 <p className="text-xl font-bold">₹XX,XXX</p>
//               </div>
//               <div className="bg-green-100 p-4 rounded-lg shadow w-full">
//                 <p className="text-lg font-semibold">
//                   Highest Expense Category
//                 </p>
//                 <p className="text-xl font-bold">Food (₹X,XXX)</p>
//               </div>
//               <div className="bg-yellow-100 p-4 rounded-lg shadow w-full">
//                 <p className="text-lg font-semibold">
//                   Predicted Next Month's Expenses
//                 </p>
//                 <p className="text-xl font-bold">₹XX,XXX</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Content Area */}
//         <div className="p-6 overflow-y-auto h-full">
//           {selectedSection === "upload" && (
//             <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto border border-gray-300">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//                 Upload Your Bank Statement File
//               </h2>

//               {/* Drag & Drop Area */}
//               <div
//                 className={`border-2 border-dashed p-6 rounded-lg text-center ${
//                   dragging
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-400 bg-gray-100"
//                 }`}
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   setDragging(true);
//                 }}
//                 onDragLeave={() => setDragging(false)}
//                 onDrop={handleDrop}
//               >
//                 {selectedFile ? (
//                   <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md">
//                     <span className="text-gray-700 truncate">
//                       {selectedFile.name}
//                     </span>
//                     <button
//                       onClick={removeFile}
//                       className="text-red-500 font-semibold hover:text-red-700"
//                     >
//                       ❌
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-gray-600">
//                       Drag & drop your file here(.xlsx,.csv)
//                     </p>
//                     <p className="text-gray-500 text-sm mt-1">or</p>
//                     <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 mt-3 inline-block rounded-md hover:bg-blue-600 transition">
//                       Browse File
//                       <input
//                         type="file"
//                         accept=".xlsx, .csv"
//                         className="hidden"
//                         onChange={handleFileChange}
//                       />
//                     </label>
//                   </>
//                 )}
//               </div>

//               {/* Upload Button */}
//               <button
//                 className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 onClick={() => handleUpload(selectedFile)}
//                 disabled={!selectedFile}
//               >
//                 Upload
//               </button>
//             </div>
//           )}{" "}
//           {/*upload section end*/}
//           {isuploading && <Loading message="Uploading your file..." />}
//           {isanalysing && <Loading message="Analyzing your data..." />}
//           {selectedSection === "analyze" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>
              
//               <p className="mb-4">
//                 Select the duration for which you want to analyze your expenses.
//               </p>
//               <select
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 className="p-2 border rounded"
//               >
//                 <option value="3m">3 Months</option>
//                 <option value="6m">6 Months</option>
//                 <option value="1y">1 Year</option>
//                 <option value="more">More than 1 Year</option>
//               </select>
              
//             <Analyse processedData={processedData}  duration={duration} />
//           </div>
//           )}
//           {selectedSection === "predict" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4">Expense Prediction</h2>
//               <p className="mb-4">
//                 Select the duration for which you want to predict your expenses.
//               </p>
//               <select
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 className="p-2 border rounded"
//               >
//                 <option value="3m">3 Months</option>
//                 <option value="6m">6 Months</option>
//                 <option value="1y">1 Year</option>
//                 <option value="more">More than 1 Year</option>
//               </select>

          
//               <Predict
//                 predictionData={predictionData}
//                 duration={duration}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { Bell, Home, UploadCloud, BarChart2, Activity, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Predict from "./Predict.jsx";
import Analyse from "./Analysis.jsx";
import sendToML from "../../../server/routes/mlRoutes.js";
import { ArrowRightCircle } from "lucide-react"; // at the top with other imports

import Loading from "../components/LoadingOverlay.jsx";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isuploading, setisuploading] = useState(false);
  const [isanalysing, setisanalysing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");
  const [predictionData, setPredictionData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [duration, setDuration] = useState("3months");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const removeFile = () => setSelectedFile(null);

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
          setisanalysing(true);
        }, 3000);

        try {
          const mlResponse = await sendToML(data.fileUrl);
          setPredictionData(mlResponse.forecast);
          setProcessedData(mlResponse.processed_data);
          setisanalysing(false);
          setActive("Analysis");
        } catch (mlerror) {
          console.error("error in ML prediction", mlerror);
          setisanalysing(false);
        }
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
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/users/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) return <h2>Loading...</h2>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Upload", icon: <UploadCloud size={18} /> },
    { name: "Analysis", icon: <BarChart2 size={18} /> },
    { name: "Predict", icon: <Activity size={18} /> },
    { name: "Profile", icon: <User size={18} /> },
    { name: "Log Out", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6 rounded-r-3xl">
        <h2 className="text-2xl font-bold mb-10">FinTrack</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                if (item.name === "Log Out") handleLogout();
                else setActive(item.name);
              }}
              className={`flex items-center space-x-3 px-4 py-2 cursor-pointer transition-all duration-200 ${
                active === item.name
                  ? "bg-white text-purple-700 rounded-full shadow-md"
                  : "hover:text-gray-300"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 ml-6">
            
            <Avatar className="w-10 h-10" letter={user?.name?.charAt(0) || "U"} />
      <span className="text-gray-800 font-semibold text-lg">
        Welcome, {user?.name || "User"}
      </span>
      
          </div>
          
        </div>
        <hr className="border-gray-300 mb-6 mt-0 border-2" />
        

        {active === "Home" && (
          <div>
            <p className="text-gray-700 mb-4 p-6">
              Get started by uploading your bank statement, analyzing your
              spending trends, and predicting future expenses.
            </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-pink-400 to-red-400 shadow text-white rounded-2xl hover:scale-110 transition-transform duration-400" >
              <CardContent className="p-6 relative" >
                <h3 className="text-lg font-bold mb-2">Upload</h3>
                <p>Upload your bank statement file.</p>
                <ArrowRightCircle
        size={24}
        className="absolute top-5 bottom-4 right-4 text-white hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setActive("Upload")}
      />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-400 to-purple-600 shadow text-white rounded-2xl hover:scale-110 transition-transform duration-400">
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-bold mb-2">Analysis</h3>
                <p>Click here to analyse your current spending.</p>
                <ArrowRightCircle
        size={24}
        className="absolute top-5 bottom-4 right-4 text-white hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setActive("Analysis")}
      />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-cyan-400 to-teal-400 shadow text-white rounded-2xl hover:scale-110 transition-transform duration-400">
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-bold mb-2">Predict</h3>
                <p>Forecast your future financial trends.</p>
                <ArrowRightCircle
                  size={24}
                  className="absolute top-5 bottom-4 right-4 text-white hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setActive("Predict")}
                />
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {active === "Upload" && (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Upload Bank Statement</h2>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${
                dragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
              }`}
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
            >
              {selectedFile ? (
                <div>
                  <p className="mb-2">
                    Selected File: <strong>{selectedFile.name}</strong>
                  </p>
                  <button onClick={removeFile} className="text-red-600 underline text-sm">
                    Remove File
                  </button>
                </div>
              ) : (
                <p>Drag and drop your bank statement here, or click to select a file</p>
              )}
              
              <label className="mt-2 inline-block text-blue-600 underline cursor-pointer hover:text-blue-800 transition">
    Browse File
    <input
      type="file"
      onChange={handleFileChange}
      className="hidden"
      accept=".csv, .xlsx"
    />
  </label>
            </div>
            <button
              onClick={handleUpload}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              disabled={isuploading}
            >
              {isuploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
        {isuploading && <Loading message="Uploading your file..." />}
        {isanalysing && <Loading message="Analyzing your data..." />}

        {active === "Analysis" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>
              
              <p className="mb-4">
                Select the duration for which you want to analyze your expenses.
              </p>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
                <option value="more">More than 1 Year</option>
              </select>
              
            <Analyse processedData={processedData}  duration={duration} />
          </div>
          )}
        {active === "Predict" && (
            <div>
              <p className="text-2xl font-bold mb-4">Expense Prediction</p>
              <p className="mb-4">
                Select the duration for which you want to predict your expenses.
              </p>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
                <option value="more">More than 1 Year</option>
              </select>

          
              <Predict
                predictionData={predictionData}
                duration={duration}
              />
            </div>
          )}
      </div>
    </div>
  );
}
