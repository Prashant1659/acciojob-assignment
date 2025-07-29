import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">CodeBot</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-500">Signup</Link>
      </div>
    </nav>
  );
}
