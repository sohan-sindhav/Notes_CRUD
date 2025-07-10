import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../userContext";

const Login = () => {
  const { setUser, login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://notes-crud-3kly.onrender.com/api/v1/user/login",
        {
          username,
          password,
        }
      );

      const token = res.data.Token;
      localStorage.setItem("token", token);
      //  setUser({ username });
      login({ username });
      toast.success(`Welcome ${username}`);
      setUsername("");
      setPassword("");
      navigate("/notes/feed");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#5f2c82] to-[#49a09d] text-white px-4 flex-col gap-2">
      <h1 className="font-semibold">
        If register doesn't work.. try after 2 mins. render free backend takes 2
        mins time to startup
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 bg-white text-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-center font-bold text-4xl border-b border-gray-300 pb-4">
          Login
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
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          doesn't have account?{" "}
          <Link
            to="/auth/register"
            className="text-[#5f2c82] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
