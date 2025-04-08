import React, { useState, useEffect } from "react";

const BloodInventoryPage = () => {
  // State for inventory, selected blood group, modal visibility, new amount, and error message
  const [inventory, setInventory] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch inventory data from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory"); // Replace with your actual API URL
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        console.error("Error fetching inventory", err);
      }
    };

    fetchInventory();
  }, []);

  // Handle opening of the modal with the specific blood group and current amount
  const handleEditClick = (bloodGroup, amount) => {
    setSelectedBloodGroup(bloodGroup);
    setNewAmount(amount);
    setIsModalOpen(true);
    setError(""); // Reset error when editing
  };

  // Handle form submit to update blood amount
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newAmount || isNaN(newAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/inventory`, { // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "bloodGroup": selectedBloodGroup,
          "bloodAmount": newAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the inventory.");
      }

      const updatedData = await response.json();
      setInventory((prev) =>
        prev.map((item) =>
          item.bloodGroup === selectedBloodGroup
            ? { ...item, amount: newAmount }
            : item
        )
      );
      

      setError("");
      setIsModalOpen(false); // Close the modal after successful update
      updatedData();
    } catch (err) {
      setError("Error updating blood inventory. Please try again.");
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(""); // Reset error when closing the modal
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Blood Inventory Management</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div key={item.bloodGroup} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{item.bloodGroup}</h2>
            <p className="text-lg mt-2">Amount: {item.bloodAmount} units</p>
            <button
              onClick={() => handleEditClick(item.bloodGroup, item.bloodAmount)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Edit Blood Group</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-lg font-medium">New Blood Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Enter new blood amount"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodInventoryPage;
