import React, { useState } from 'react';
import jsPDF from 'jsPDF';

export default function Certification() {
  const [donor, setDonor] = useState({
    name: 'John Doe',
    bloodType: 'O+',
    donationDate: 'March 17, 2025',
    donorId: '123456789',
  });

  // Example function to handle certificate download (Could be implemented with a library like jsPDF)
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Blood Donation Certificate", 105, 30, { align: 'center' });
    doc.text(`Donor Name: ${donor.name}`, 20, 50);
    doc.text(`Blood Type: ${donor.bloodType}`, 20, 60);
    doc.text(`Donation Date: ${donor.donationDate}`, 20, 70);
    doc.text(`Donor ID: ${donor.donorId}`, 20, 80);

    // Download the certificate as a PDF
    doc.save('donation_certificate.pdf');
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Certification Header */}
      <h2 className="text-4xl font-semibold text-blue-600 mb-8 text-center">
        Blood Donation Certificate
      </h2>

      {/* Certificate Details */}
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Certificate of Appreciation</h3>
          <p className="text-lg text-gray-700 mb-6">
            This is to certify that the following individual has made a valuable contribution by donating blood.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-700 mb-2"><strong>Donor Name:</strong> {donor.name}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Blood Type:</strong> {donor.bloodType}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Donation Date:</strong> {donor.donationDate}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Donor ID:</strong> {donor.donorId}</p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
