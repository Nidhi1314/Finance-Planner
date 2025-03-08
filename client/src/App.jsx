import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
   
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>

    </Routes>
    
  );
}

export default App;
