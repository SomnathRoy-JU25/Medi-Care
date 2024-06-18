import React from "react";

const Patient = ({ age, ageChange, male, female, gender }) => {
  return (
    <>
      <div className="tablet:col-span-6 p-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="range-slider">
            What is your age?
            <h2 className="text-blue-500">{age}</h2>
          </label>
          <input
            id="range-slider"
            className="block w-full mt-2 bg-gray-200 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="range"
            min="0"
            max="100"
            value={age}
            onChange={ageChange}
          />
        </form>
      </div>
        <div className="bg-white shadow-md rounded  pt-6 ml-12 mb-0">
          <p className="text-gray-700 text-sm font-bold mb-2">What is your sex?</p>
          <div className="flex items-center mt-2">
            <input
              className="mr-2 leading-tight"
              id="stanton"
              type="radio"
              checked={male}
              onChange={gender}
              name="gender"
              value="male"
            />
            <label className="text-sm" htmlFor="stanton">Male</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              className="mr-2 leading-tight"
              id="anthony"
              type="radio"
              checked={female}
              onChange={gender}
              name="gender"
              value="female"
            />
            <label className="text-sm" htmlFor="anthony">Female</label>
          </div>
        </div>
    </>
  );
};

export default Patient;
