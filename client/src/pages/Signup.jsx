import { useState } from "react";
import {RegisterUser} from '../api/auth.js';
import {useNavigate} from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signing up with:", formData.name, formData.email, formData.password);
    try{
      await RegisterUser(formData);
      alert("signup successful! please login");
      navigate('/login');
    }catch(error){
      setError(error);
      console.log("Error in signup:",error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-4">Join FinTrack today!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
