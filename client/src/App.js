import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Tickets from "./pages/tickets";
import Dashboard from "./pages/dashboard";  
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

