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
    
    if (availableBlood.bloodAmount >= requestedAmount) {
      try {
        // Update inventory after accepting the request
        const updateInventoryResponse = await fetch(`http://localhost:5000/api/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bloodGroup: bloodGroup, bloodAmount: availableBlood.bloodAmount - requestedAmount }),
        });

        if (!updateInventoryResponse.ok) {
          throw new Error("Failed to update blood inventory");
        }

        // Update the requestStatus of the blood request to 'approved'
        const acceptRequestResponse = await fetch(`http://localhost:5000/api/blood-request/${requestId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestStatus: "Approved" }),
        });

        if (!acceptRequestResponse.ok) {
          throw new Error("Failed to accept the request");
        }

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
      // Update the requestStatus of the blood request to 'rejected'
      const rejectRequestResponse = await fetch(`http://localhost:5000/api/blood-request/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestStatus: "Rejected" }),
      });

      if (!rejectRequestResponse.ok) {
        throw new Error("Failed to reject the request");
      }

      // Remove the rejected blood request from the state
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));

      alert('Blood request rejected successfully');
    } catch (err) {
      setError('Failed to reject the blood request');
    }
  };

  // Group requests by their status
  const groupedRequests = {
    pending: requests.filter(request => request.requestStatus === "Pending"),
    approved: requests.filter(request => request.requestStatus === "Approved"),
    rejected: requests.filter(request => request.requestStatus === "Rejected"),
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Blood Requests Management</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Pending Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Pending Blood Requests</h2>
        {groupedRequests.pending.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No pending requests</p>
        ) : (
          groupedRequests.pending.map((request) => {
            const { _id, bloodType, bloodAmount, requestStatus } = request;
            const availableBlood = inventory.find((item) => item.bloodGroup === bloodType);
            const isAcceptDisabled = availableBlood ? availableBlood.bloodAmount < bloodAmount : true;

            return (
              <div key={_id} className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold text-blue-600">{bloodType}</div>
                  <div className="text-sm font-semibold text-yellow-500">{requestStatus}</div>
                </div>

                <div className="mb-4">
                  <p className="text-lg text-gray-700">Requested: {bloodAmount} units</p>
                  <p className="text-sm text-gray-500">Available: {availableBlood ? availableBlood.bloodAmount : 0} units</p>
                </div>

                <div className="flex space-x-4 mt-4 justify-end">
                  <button
                    onClick={() => handleAcceptRequest(_id, bloodType, bloodAmount)}
                    disabled={isAcceptDisabled}
                    className={`px-4 py-2 text-white cursor-pointer rounded-lg shadow-md transition-all duration-300 ${isAcceptDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(_id)}
                    className="px-4 py-2 text-white bg-red-600 cursor-pointer rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Approved Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-500 mb-4">Approved Blood Requests</h2>
        {groupedRequests.approved.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No approved requests</p>
        ) : (
          groupedRequests.approved.map((request) => {
            const { _id, bloodType, bloodAmount, requestStatus } = request;
            return (
              <div key={_id} className="flex flex-col p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold text-green-600">{bloodType}</div>
                  <div className="text-sm font-semibold text-green-500">{requestStatus}</div>
                </div>

                <div className="mb-4">
                  <p className="text-lg text-gray-700">Requested: {bloodAmount} units</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Rejected Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Rejected Blood Requests</h2>
        {groupedRequests.rejected.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No rejected requests</p>
        ) : (
          groupedRequests.rejected.map((request) => {
            const { _id, bloodType, bloodAmount, requestStatus } = request;
            return (
              <div key={_id} className="flex flex-col p-6 bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold text-red-600">{bloodType}</div>
                  <div className="text-sm font-semibold text-red-500">{requestStatus}</div>
                </div>

                <div className="mb-4">
                  <p className="text-lg text-gray-700">Requested: {bloodAmount} units</p>
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
