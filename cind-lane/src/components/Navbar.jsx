import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/draft" className="hover:underline">Draft</Link>
          </li>
          <li>
            <Link to="/account" className="hover:underline">Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
