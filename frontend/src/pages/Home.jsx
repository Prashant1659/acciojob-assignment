import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to UI Genie 🧞‍♂️</h1>
      <p className="text-lg text-gray-700 text-center mb-8 max-w-xl">
        Generate beautiful React components using AI. Describe what you want, get code instantly, preview it live, and copy with ease.
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400">Signup</button>
        </Link>
      </div>
    </div>
  );
}
