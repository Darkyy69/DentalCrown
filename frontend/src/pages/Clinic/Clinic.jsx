import React from "react";

const Clinic = () => {
  // Fake data
  const fakeData = {
    name: "Fake Clinic",
    address: "123 Fake Street",
    phone: "555-1234",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name: event.target.name.value,
      address: event.target.address.value,
      phone: event.target.phone.value,
    });
    // Add your logic here for handling form submission
    console.log("Form submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Clinic Information</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Clinic Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            placeholder="Enter clinic name"
            value={fakeData.name}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Clinic Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="address"
            placeholder="Enter clinic address"
            value={fakeData.address}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Clinic Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="phone"
            placeholder="Enter clinic phone number"
            value={fakeData.phone}
            readOnly
          />
        </div>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Clinic;
