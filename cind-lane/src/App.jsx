import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import cindLaneLogo from '/cind_lane_logo.png';
import './App.css';

const Home = () => <h2 className="text-center mt-10 text-primary">Welcome to Home</h2>;
const Draft = () => <h2 className="text-center mt-10 text-primary">Draft</h2>;
const Account = () => <h2 className="text-center mt-10 text-primary">Account</h2>;

function App() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="bg-background text-primary min-h-screen">
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>

        {/* Theme Switcher */}
        <div className="fixed bottom-4 right-4 flex space-x-2">
          <button
            className="px-4 py-2 rounded bg-primary text-background"
            onClick={() => setTheme("default")}
          >
            Default
          </button>
          <button
            className="px-4 py-2 rounded bg-secondary text-background"
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            className="px-4 py-2 rounded bg-accent text-background"
            onClick={() => setTheme("warm")}
          >
            Warm
          </button>
        </div>
      </Router>
    </div>
  );
}

export default App;
