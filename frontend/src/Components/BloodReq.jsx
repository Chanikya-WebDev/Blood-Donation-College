import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // To access query parameters
// For sending API requests

export default function BloodRequestForm() {
  // Get the blood type from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBloodType = queryParams.get('bloodType'); // Default to 'A+' if not provided
  

  // State for the blood type
  const [bloodType, setBloodType] = useState(initialBloodType);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    bloodType,
    bloodAmount: "",
    doctorPrescription: null,
    hospitalName: "",
    hospitalAddress: "",
  });

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change for doctor's prescription
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      doctorPrescription: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctorPrescription) {
      alert("Please upload a doctor's prescription.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("bloodType", bloodType);
      formDataToSend.append("bloodAmount", formData.bloodAmount);
      formDataToSend.append("doctorPrescription", formData.doctorPrescription);
      formDataToSend.append("hospitalName", formData.hospitalName);
      formDataToSend.append("hospitalAddress", formData.hospitalAddress);

      const response = await fetch("http://localhost:5000/api/blood-requests", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.status===201) {
        alert(`Request for ${formData.bloodAmount} ml of blood ${bloodType} submitted successfully.`);
      } else {
        alert("Failed to submit the request.");
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
      alert("An error occurred while submitting the request.");
    }

    setFormData({
      name: "",
      contact: "",
      bloodAmount: "",
      doctorPrescription: null,
      hospitalName: "",
      hospitalAddress: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Request {bloodType} Blood
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name" className="mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-4 p-2 border-2 rounded-lg"
          required
        />

        <label htmlFor="contact" className="mb-2">Contact Info</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className="mb-4 p-2 border-2 rounded-lg"
          required
        />

        <label htmlFor="bloodAmount" className="mb-2">Amount (in ml)</label>
        <input
          type="number"
          id="bloodAmount"
          name="bloodAmount"
          value={formData.bloodAmount}
          onChange={handleInputChange}
          className="mb-4 p-2 border-2 rounded-lg"
          required
        />

        {/* File input for doctor's prescription */}
        <label htmlFor="doctorPrescription" className="mb-2">Doctor's Prescription (PDF, JPG, PNG)</label>
        <input
          type="file"
          id="doctorPrescription"
          name="doctorPrescription"
          accept=".pdf,.jpg,.png"
          onChange={handleFileChange}
          className="mb-4 p-2 border-2 rounded-lg"
          required
        />

        <label htmlFor="hospitalName" className="mb-2">Hospital Name</label>
        <input
          type="text"
          id="hospitalName"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleInputChange}
          className="mb-4 p-2 border-2 rounded-lg"
          required
        />

        <label htmlFor="hospitalAddress" className="mb-2">Hospital Address</label>
        <textarea
          id="hospitalAddress"
          name="hospitalAddress"
          value={formData.hospitalAddress}
          onChange={handleInputChange}
          className="mb-4 p-2 border-2 rounded-lg"
          placeholder="Enter hospital address"
          required
        />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
