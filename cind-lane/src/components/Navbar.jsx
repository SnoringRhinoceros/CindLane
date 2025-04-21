import { Link } from "react-router-dom";
import cindLaneLogo from '/cind_lane_logo.png';

const Navbar = () => {
  return (
    <nav className="text-accent bg-primary p-4 shadow-md relative z-30">
      <div className="container mx-auto flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-4">
          <img src={cindLaneLogo} alt="CindLane Logo" className="w-10 h-10" style={{ imageRendering: "pixelated" }}/>
          <h1 className="text-xl font-bold">CindLane</h1>
        </Link>
        
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/draft" className="hover:underline">Draft</Link>
          </li>
          {/* <li>
            <Link to="/account" className="hover:underline">Account</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
