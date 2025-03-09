import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from './components/PrivateRoute';
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
   
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route element={<PrivateRoute/>}>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Route>
    </Routes>
    
  );
}

export default App;
