import React, { useState, useEffect } from 'react';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donor data from API when component mounts
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        // Replace this URL with your API endpoint
        const response = await fetch('http://localhost:5000/api/donors');
        
        if (!response.ok) {
          throw new Error('Failed to fetch donor data');
        }

        const data = await response.json();
        setDonors(data); // Update state with the fetched donor data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // Set error if something went wrong
        setLoading(false); // Set loading to false on error
      }
    };

    fetchDonors(); // Call the function to fetch donor data
  }, []); // Empty dependency array means this runs only once after initial render

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Loading Donor List...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Donor List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Blood Group</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.donorId} className={donor.approved ? 'bg-green-100' : 'bg-red-100'}>
                <td className="py-2 px-4 border-b">{donor.firstName} {donor.lastName}</td>
                <td className="py-2 px-4 border-b">{donor.phone}</td>
                <td className="py-2 px-4 border-b">{donor.email}</td>
                <td className="py-2 px-4 border-b">{donor.address}</td>
                <td className="py-2 px-4 border-b">{donor.bloodGroup}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      donor.eligibility ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {donor.eligibility ? 'Approved' : 'Not Approved'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorList;
