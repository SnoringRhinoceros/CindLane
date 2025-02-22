import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import Account from "./pages/Account";
import './App.css';

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
