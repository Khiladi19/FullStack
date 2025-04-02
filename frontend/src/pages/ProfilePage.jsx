import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function UsersProfile() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-gray-500 mt-4">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Profile</h2>
        <div className="border-b border-gray-300 my-2"></div>
        <p className="text-lg font-semibold text-gray-700">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>

        {/* ✅ Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default UsersProfile;

