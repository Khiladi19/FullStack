import React, { forwardRef, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
function RegisterForm() {
  const {userRegister} = useContext(AppContext)
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("text-red-500"); // Success/Error message color

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {name,email,password} = formData
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await userRegister(name,email,password)
      if(result.success){
        navigate("/login");
      }
      setMessage("User Register Successfully");
      setMessageType("text-green-500");
      setFormData({ name: "", email: "", password: "" }); // Reset form
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
      setMessageType("text-red-500");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          User Registration
        </h2>

        {message && (
          <p className={`text-center ${messageType} mb-3`}>{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
