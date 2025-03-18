// src/DonorList.js
import React, { useState } from 'react';

const DonorList = () => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: 'John Doe',
      approved: true,
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      address: '123 Main St, Springfield',
      bloodGroup: 'O+',
    },
    {
      id: 2,
      name: 'Jane Smith',
      approved: false,
      phone: '234-567-8901',
      email: 'janesmith@example.com',
      address: '456 Elm St, Springfield',
      bloodGroup: 'A-',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      approved: true,
      phone: '345-678-9012',
      email: 'emilyjohnson@example.com',
      address: '789 Oak St, Springfield',
      bloodGroup: 'B+',
    },
    {
      id: 4,
      name: 'Michael Brown',
      approved: false,
      phone: '456-789-0123',
      email: 'michaelbrown@example.com',
      address: '101 Pine St, Springfield',
      bloodGroup: 'AB+',
    },
  ]);

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
              <tr key={donor.id} className={donor.approved ? 'bg-green-100' : 'bg-red-100'}>
                <td className="py-2 px-4 border-b">{donor.name}</td>
                <td className="py-2 px-4 border-b">{donor.phone}</td>
                <td className="py-2 px-4 border-b">{donor.email}</td>
                <td className="py-2 px-4 border-b">{donor.address}</td>
                <td className="py-2 px-4 border-b">{donor.bloodGroup}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      donor.approved ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {donor.approved ? 'Approved' : 'Not Approved'}
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
