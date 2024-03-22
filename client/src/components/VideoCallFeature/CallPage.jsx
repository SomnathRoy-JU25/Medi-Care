import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const CallPage = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  
  return (
    <div className="flex flex-col lg:flex-col gap-2 justify-start">
        <h1 className="text-3xl font-bold text-white">Enter Room Code to Join</h1>
        <div className="flex flex-row justify-start">
       <input
         className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
         value={value}
         onChange={(e) => setValue(e.target.value)}
         type="text"
         placeholder="Enter Room Code"
       />
        
       <button
         className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         bg-yellow-50 text-black hover:shadow-none hover:scale-95 transition-all duration-200 `}
         onClick={handleJoinRoom}
       >
         {" "}
         Join Room{" "}
       </button> 
 
     </div>
    </div>
   
  );
};

export default CallPage;
