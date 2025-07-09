import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post("http://localhost:5000/api/v1/user/create", {
          username,
          password,
        })
        .then(() => {
          toast.success(`User ${username} created.`);
          navigate("/auth/login");
          setTimeout(() => {
            setUsername("");
            setPassword("");
          }, 300);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    } catch (error) {
      console.log("Error creating user");
      toast.error("Error creating user");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#5f2c82] to-[#49a09d] text-white px-4 flex-col gap-2 ">
      <h1 className="font-semibold">
        If register doesn't work.. try after 2 mins. render free backend takes 2
        mins time to startup
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white text-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-center font-bold text-4xl border-b border-gray-300 pb-4">
          Create Account
        </h1>

        <div className="flex flex-col gap-2 text-lg">
          <label className="font-semibold">Username</label>
          <input
            type="text"
            className="p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#5f2c82] bg-white"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 text-lg">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#5f2c82] bg-white"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="p-3 w-full bg-gradient-to-r from-[#5f2c82] to-[#49a09d] text-white font-bold rounded hover:opacity-90 transition"
        >
          Sign up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/auth/login"
            className="text-[#5f2c82] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
