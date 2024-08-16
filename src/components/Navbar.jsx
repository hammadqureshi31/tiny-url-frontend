import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiSwapThin } from "react-icons/pi";


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let user = useSelector((state) => state.user?.username)

  useEffect(() => {
    console.log(user);
    
    if (user){
      setIsAuthenticated(true);
    }
    else setIsAuthenticated(false);
  }, [user]);

  


  const handleLogout = () => {
    navigate("/logout")
  }

  return (
    <>
      <div className="w-full flex justify-around text-center px-4">
        <div className="flex gap-0.5 sm:gap-0">
          <h1 className="pt-4 text-3xl text-[#144ee3] md:pt-3 md:text-4xl">
          <PiSwapThin />
          </h1>
          <h1 className="w-full text-left font-serif text-3xl pt-3 text-[#144ee3] sm:pl-1 md:text-4xl">
            Reducer
          </h1>
        </div>
        {isAuthenticated ? (
          <div className="flex w-full justify-end">
            <h2 className="hidden sm:inline-block sm:text-[#144ee3]   sm:pt-3 sm:pr-2
             md:mt-1.5">
              <span className="font-light text-white font-serif text-2xl ">Hello!</span>
              <span className="uppercase font-sans text-2xl font-bold tracking-widest">{` "${user}"`}</span>
            </h2>
            <div className="mt-2.5 md:pl-8 md:mt-3">
              <button
                className="bg-zinc-700  h-10  ring-2 ring-zinc-400 flex justify-center text-center px-2 pb-2 text-md rounded-2xl sm:px-4 sm:pb-2.5 gap-1.5"
                onClick={handleLogout}
              >
                <div className="mt-2">Logout</div>
                <div className=" hidden sm:inline-block sm:mt-3.5">
                  <CiLogin />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex gap-3 justify-end text-center pt-3 sm:pr-6">
            <button
              className="bg-zinc-700 ring-2 px-3 ring-zinc-400 rounded-2xl sm:px-4  h-10  flex gap-1"
              onClick={() => navigate("/login")}
            >
              <div className="mt-2">Login</div>
              <div className=" hidden sm:pt-2.5 sm:text-xl">
                <CiLogin />
              </div>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hidden md:inline-block md:px-4 h-10 rounded-2xl ring-2 ring-blue-400 bg-[#144ee3] text-white"
            >
              Register Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
