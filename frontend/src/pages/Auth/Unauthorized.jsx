import React from "react";

const Unauthorized = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized</h2>
        <p className="text-gray-600 mb-6">
          You are not authorized to access this page.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
