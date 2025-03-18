import { useState } from "react";
import { Link } from "react-router-dom";

export default function BloodInventory() {
  // Initial inventory for blood types
  const [inventory] = useState({
    "A+": 800,
    "A-": 500,
    "B+": 200,
    "B-": 300,
    "AB+": 400,
    "AB-": 210,
    "O+": 100,
    "O-": 80,
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400">
          Blood Bank
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/donors"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Donors List
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Donate Blood
            </Link>
          </li>
          <li>
            <Link
              to="/certification"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Certification
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Blood Inventory Available
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.keys(inventory).map((bloodType) => (
            <div
              key={bloodType}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div
                className="text-xl font-semibold text-white bg-red-500 p-2 rounded mb-4"
              >
                {bloodType}
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {inventory[bloodType]} ml
              </div>
              <div className="text-lg text-gray-600 mb-4">Available Blood Units</div>

              {/* Request button */}
              <Link to="/BloodReq">
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  Request Blood
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
