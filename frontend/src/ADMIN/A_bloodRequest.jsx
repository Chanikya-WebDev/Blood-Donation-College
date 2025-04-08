import React, { useState, useEffect } from "react";

const AdminBloodRequestPage = () => {
  // State to store blood requests, inventory, and error message
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  // Fetch blood requests and inventory
  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blood-requests"); // Replace with your actual API URL
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError("Error fetching blood requests");
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory"); // Replace with your actual API URL
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError("Error fetching blood inventory");
      }
    };

    fetchBloodRequests();
    fetchInventory();
  }, []);

  // Handle accepting a blood request
  const handleAcceptRequest = async (requestId, bloodGroup, requestedAmount) => {
    const availableBlood = inventory.find(item => item.bloodGroup === bloodGroup);
    
    if (availableBlood.amount >= requestedAmount) {
      try {
        // Accept the request and update inventory
        const updateInventoryResponse = await fetch(`http://localhost:5000/api/blood-inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bloodGroup:bloodGroup,bloodAmount: availableBlood.bloodAmount - requestedAmount }),
        });

        if (!updateInventoryResponse.ok) {
          throw new Error("Failed to update blood inventory");
        }

        // Mark the request as accepted
        // const acceptRequestResponse = await fetch(`/api/blood-request/${requestId}/accept`, {
        //   method: "PUT",
        // });

        // if (!acceptRequestResponse.ok) {
        //   throw new Error("Failed to accept the request");
        // }

        // Update the state to reflect the changes
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.bloodGroup === bloodGroup
              ? { ...item, bloodAmount: item.bloodAmount - requestedAmount }
              : item
          )
        );
      } catch (err) {
        setError("Error processing request");
      }
    }
  };

  // Handle rejecting a blood request
  const handleRejectRequest = async (requestId) => {
    
      try {
        const response = await fetch(`http://localhost:5000/api/blood-request/${requestId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete the blood request');
        }
  
        // Remove the deleted blood request from the state
        setRequests(requests.filter((request) => request._id !== requestId));
        alert('Blood request deleted successfully');
      } catch (err) {
        setError('Failed to delete the blood request');
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Blood Requests Management</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-center">No blood requests available</p>
        ) : (
          requests.map((request) => {
            const { _id, bloodType, bloodAmount } = request;
            const availableBlood = inventory.find((item) => item.bloodGroup === bloodType);
            const isAcceptDisabled = availableBlood ? availableBlood.bloodAmount < bloodAmount : true;

            return (
              <div key={_id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{bloodType}</span>
                  <span className="text-sm">Requested: {bloodAmount} units</span>
                  <span className="text-sm">Available: {availableBlood ? availableBlood.bloodAmount : 0} units</span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAcceptRequest(_id, bloodType, bloodAmount)}
                    disabled={isAcceptDisabled}
                    className={`text-2xl ${isAcceptDisabled ? "text-gray-500" : "text-green-500"}`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleRejectRequest(_id)}
                    className="text-2xl text-red-500"
                  >
                    ✖
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminBloodRequestPage;
