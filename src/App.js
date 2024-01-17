
import {
  BrowserRouter ,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import DashBoard from "./pages/Dashboard/DashBoard";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clock" element={<DashBoard/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
