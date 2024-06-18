import React from "react";

const Home = (props) => {
  return (
    <React.Fragment>
      <div id="Home" className="grid grid-cols-1 md:grid-cols-2 p-4 ml-5 mr-6">
        <p className="mb-4 text-gray-800">
          Before using this symptom checker, please read carefully and accept our Terms and Services:
        </p>
        <ul className="list-disc list-inside mb-4 font-semibold font-serif">
          <li>1. This checkup is not a diagnosis.</li>
          <li>2. This checkup is for informational purposes and is not a qualified medical opinion.</li>
          <li>3. Information that you provide is anonymous and not shared with anyone. We also do not store any information on our server.</li>
        </ul>
        <form className="mb-4">
          <div className="flex flex-row justify-items-center items-center gap-1">
            <input
              checked={props.isChecked}
              onChange={props.checked}
              className="form-checkbox h-4 w-4 text-blue-600"
              id="truth"
              type="checkbox"
              name="historical-figures-1"
              value="truth"
            />
    
            <label className="text-gray-700" htmlFor="truth">
              I agree to the Medicare terms and conditions
            </label>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Home;
