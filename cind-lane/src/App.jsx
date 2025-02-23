import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import Account from "./pages/Account";
import './App.css';

function App() {
  return (
    <div className="bg-background h-screen flex flex-col overflow-hidden">
      <Router>
        <div className="flex flex-col flex-grow h-full overflow-hidden">
          <Navbar />
          <div className="flex-grow overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/draft" element={<Draft />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
