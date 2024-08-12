import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiLinktreeLogoThin } from "react-icons/pi";


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let user = useSelector((state) => state.user?.username) || localStorage.getItem("loggedInUserName")

  useEffect(() => {
    console.log(user);
    const googleLogin = localStorage.getItem("googleLogin")
    
    if (user || googleLogin){
      setIsAuthenticated(true);
    }
    else setIsAuthenticated(false);
  }, [user]);

  // const googleLoginState = useSelector((state) => state.googleLogin);
  // console.log("googleLoginState:", googleLoginState);  // This should log "pending" after the dispatch
  


  const handleLogout = () => {
    navigate("/logout")
  }

  return (
    <>
      <div className="w-full flex justify-around text-center px-4">
        <div className="flex gap-0.5 sm:gap-0">
          <h1 className="pt-2.5 text-4xl text-[#144ee3] md:pt-3.5">
          <PiLinktreeLogoThin />
          </h1>
          <h1 className="w-full text-left text-3xl font-sans font-thin pt-3 text-[#144ee3] sm:pl-1 md:text-4xl">
            Reducer
          </h1>
        </div>
        {isAuthenticated ? (
          <div className="flex w-full justify-end">
            <h2 className="hidden sm:inline-block sm:text-[#144ee3] font-mono font-semibold text-2xl tracking-wide sm:pt-3 sm:pr-2
             md:mt-1.5">
              <span className="font-sans font-extralight text-white">Hello!</span>
              {` "${user}"`}
            </h2>
            <div className="mt-2.5 md:pl-8 md:mt-3">
              <button
                className="bg-zinc-700 ring-2 ring-zinc-400 rounded-2xl px-4 pb-2.5 flex gap-1.5"
                onClick={handleLogout}
              >
                <div className="mt-2">Logout</div>
                <div className="mt-3.5">
                  <CiLogin />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex gap-3 justify-end text-center pt-3 pr-6">
            <button
              className="bg-zinc-700 ring-2 ring-zinc-400 rounded-2xl px-4  h-10  flex gap-1"
              onClick={() => navigate("/login")}
            >
              <div className="mt-2">Login</div>
              <div className="pt-2.5 text-xl">
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
