import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className="h-screen gap-4 flex flex-col justify-center items-center bg-gradient-to-r from-[#c31432] to-[#240b36]">
        <h1 className="font-sans font-bold text-4xl text-white">
          Welcome to Notes app
        </h1>
        <div className="buttons flex gap-3 ">
          <button className="text-lg text-white hover:bg-white hover:text-black transition-all duration-100 border border-white p-2 rounded">
            <Link to={"/auth/login"}>Login</Link>
          </button>
          <button className="text-lg bg-white hover:bg-transparent text-black  hover:text-white transition-all duration-100 border border-white p-2 rounded">
            <Link to={"/auth/register"}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
