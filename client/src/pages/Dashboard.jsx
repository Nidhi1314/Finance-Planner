import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Paper,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import {
  Home as HomeIcon,
  UploadFile as UploadIcon,
  Analytics as AnalyzeIcon,
  AutoGraph as PredictIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Predict from "./Predict.jsx";
import Analyse from "./Analysis.jsx";
import sendToML from "../../../server/routes/mlRoutes.js";
import Loading from "../components/LoadingOverlay.jsx";

const drawerWidth = 240;

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isuploading, setIsUploading] = useState(false);
  const [isanalysing, setIsAnalysing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");
  const [predictionData, setPredictionData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [duration, setDuration] = useState("3m");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  // Dashboard fetch
  useEffect(() => {
    async function fetchDashboard() {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:5000/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFileChange = e => setSelectedFile(e.target.files[0]);
  const removeFile = () => setSelectedFile(null);
  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Select a file first!");

    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsUploading(true);
    setIsAnalysing(false);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setIsUploading(false);
        toast.success("Upload successful!");
        setSelectedFile(null);

        setTimeout(async () => {
          setIsAnalysing(true);
          try {
            const mlResponse = await sendToML(data.fileUrl);
            setPredictionData(mlResponse.forecast);
            setProcessedData(mlResponse.processed_data);
            setIsAnalysing(false);
            setSelectedSection("analyze");
          } catch {
            setIsAnalysing(false);
            toast.error("ML analysis failed.");
          }
        }, 1500);
      } else {
        setIsUploading(false);
        toast.error(data.message || "Upload failed.");
      }
    } catch {
      setIsUploading(false);
      toast.error("Upload error.");
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
  <Box sx={{ display: "flex", height: "100vh" }}>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #0d47a1, #001f54)", // 🔵 darker gradient
          color: "white"
        }
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Fin<span style={{ color: "#ffc107" }}>Track</span>
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {[
          { id: "home", label: "Home", icon: <HomeIcon /> },
          { id: "upload", label: "Upload File", icon: <UploadIcon /> },
          { id: "analyze", label: "Analyze", icon: <AnalyzeIcon /> },
          { id: "predict", label: "Predict Expense", icon: <PredictIcon /> }
        ].map(item => (
          <ListItem
            button
            key={item.id}
            selected={selectedSection === item.id}
            onClick={() => setSelectedSection(item.id)}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: selectedSection === item.id ? "bold" : "normal"
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>

    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user.name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* ⬇️ Removed flexGrow from here */}
      <Box sx={{ p: 3, overflowY: "auto" }}>
        {selectedSection === "home" && (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Upload your statements, analyze spending, and predict future expenses.
            </Typography>
            <Box
              component={Paper}
              sx={{ p: 3, mb: 3, background: "#fff" }}
              elevation={2}
            >
              <Typography variant="h6">Quick Guide</Typography>
              <List>
                {[
                  { label: "Upload", section: "upload" },
                  { label: "Analyze", section: "analyze" },
                  { label: "Predict", section: "predict" }
                ].map((it, idx) => (
                  <ListItem button key={idx} onClick={() => setSelectedSection(it.section)}>
                    <ListItemText primary={`→ Go to ${it.label}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}

        {selectedSection === "upload" && (
          <Paper sx={{ p: 3, mx: "auto", maxWidth: 600 }} elevation={2}>
            <Typography variant="h5" centered gutterBottom>
              Upload Your Bank Statement
            </Typography>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
                {selectedFile ? selectedFile.name : "Select file (.csv, .xlsx)"}
              </Button>
            </label>
            {selectedFile && (
              <Button color="secondary" onClick={removeFile}>
                Remove File
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!selectedFile || isuploading}
              onClick={handleUpload}
            >
              {isuploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Paper>
        )}

        {isanalysing && <Loading message="Analyzing your data..." />}
        {selectedSection === "analyze" && (
  <Paper sx={{ p: 3, height: 500, overflow: "hidden" }} elevation={2}>
    <Typography variant="h5" gutterBottom>
      Expense Analysis
    </Typography>
    <FormControl sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel>Duration</InputLabel>
      <Select
        value={duration}
        label="Duration"
        onChange={e => setDuration(e.target.value)}
      >
        <MenuItem value="3m">3 Months</MenuItem>
        <MenuItem value="6m">6 Months</MenuItem>
        <MenuItem value="1y">1 Year</MenuItem>
        <MenuItem value="more">More than 1 Year</MenuItem>
      </Select>
    </FormControl>
    <Box sx={{ height: 400 }}>
      <Analyse processedData={processedData} duration={duration} />
    </Box>
  </Paper>
)}

{selectedSection === "predict" && (
  <Paper sx={{ p: 3, height: 500, overflow: "hidden" }} elevation={2}>
    <Typography variant="h5" gutterBottom>
      Expense Prediction
    </Typography>
    <FormControl sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel>Duration</InputLabel>
      <Select
        value={duration}
        label="Duration"
        onChange={e => setDuration(e.target.value)}
      >
        <MenuItem value="3m">3 Months</MenuItem>
        <MenuItem value="6m">6 Months</MenuItem>
        <MenuItem value="1y">1 Year</MenuItem>
        <MenuItem value="more">More than 1 Year</MenuItem>
      </Select>
    </FormControl>
    <Box sx={{ height: 400 }}>
      <Predict predictionData={predictionData} duration={duration} />
    </Box>
  </Paper>
)}

      </Box>
    </Box>
  </Box>
)};
export default Dashboard;
