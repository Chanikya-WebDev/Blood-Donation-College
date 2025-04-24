import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BloodInventory() {
  // Simulate user login state
  const [user, setUser] = useState(null); // If the user is logged in, store user info here

  // State for the inventory, loading, and error
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blood inventory when the component is mounted
  useEffect(() => {
    const fetchBloodInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory"); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }
        const data = await response.json();
        setInventory(data); // Set the fetched data into the state
        setLoading(false);
      } catch (err) {
        setError("Error fetching inventory data");
        setLoading(false);
      }
    };

    fetchBloodInventory();
  }, []);

  // Simulate user login (replace with actual login logic)
  const handleLogin = () => {
    setUser({ name: "John Doe" }); // Simulate a logged-in user with a name
  };

  const handleLogout = () => {
    setUser(null); // Simulate logging out
  };

  if (loading) {
    return <div className="text-center">Loading blood inventory...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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

        {/* Login/Sign Up links or User Profile */}
        <div className="mt-6">
          {user ? (
            <div className="flex items-center">
              {/* Profile icon and name */}
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-2 flex items-center justify-center text-white">
                <span className="text-sm">{user.name[0]}</span>
              </div>
              <span className="text-lg text-white">{user.name}</span>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="block text-lg text-white hover:text-blue-500 transition-colors mb-2">
                Login
              </Link>
              <Link to="/signUp" className="block text-lg text-white hover:text-blue-500 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Blood Inventory Available
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inventory.map((item) => (
            <div
              key={item.bloodGroup}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div
                className="text-xl font-semibold text-white bg-red-500 p-2 rounded mb-4"
              >
                {item.bloodGroup}
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {item.bloodAmount} ml
              </div>
              <div className="text-lg text-gray-600 mb-4">Available Blood Units</div>

              {/* Request button */}
              <Link to={`/BloodReq?bloodType=${item.bloodGroup}`}>
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
