import { useState } from "react";
import { RegisterUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await RegisterUser(formData);
      alert("Signup successful! Please login");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
      console.log("Error in signup", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-2xl bg-white/30 backdrop-blur-xl p-8 shadow-2xl border border-white/40">
        <h2 className="mb-2 text-center text-3xl font-bold text-purple-700 tracking-wide">
          Create an Account
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm font-medium">
          Join FinTrack today!
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-800 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-semibold transition duration-300 shadow"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-800 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
