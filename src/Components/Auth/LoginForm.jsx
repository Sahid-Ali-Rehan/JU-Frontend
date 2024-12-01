import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  // Log form data to console to ensure it's correct
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      toast.success(data.message);
      
      // Save token to localStorage
      localStorage.setItem("token", data.token);
  
      // Redirect based on user role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);  // Log the error to the console
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  
  

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-4">Login</h2>
        <div className="flex items-center mb-4 border-b border-gray-300">
          <AiOutlineMail className="text-2xl text-gray-600 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full focus:outline-none text-black"
            required
          />
        </div>
        <div className="flex items-center mb-6 border-b border-gray-300">
          <AiOutlineLock className="text-2xl text-gray-600 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full focus:outline-none text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-black font-semibold"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
