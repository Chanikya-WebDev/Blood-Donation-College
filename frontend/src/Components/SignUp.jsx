import { useRef} from "react";

  export default function SignUp() {
    // Using one ref for all form inputs as an object
    const formRefs = useRef({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      address: null,
      bloodGroup: null,
      donationDate: null,
      eligibility: null,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Gather all form data from refs
      const formData = {
        firstName: formRefs.current.firstName.value,
        lastName: formRefs.current.lastName.value,
        email: formRefs.current.email.value,
        phone: formRefs.current.phone.value,
        address: formRefs.current.address.value,
        bloodGroup: formRefs.current.bloodGroup.value,
        donationDate: formRefs.current.donationDate.value,
        eligibility: formRefs.current.eligibility.checked,
      };
  
      
    };
  
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto flex flex-col space-y-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600">Blood Donation Form</h2>
  
          {/* Name Fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="text-lg font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                ref={(el) => (formRefs.current.firstName = el)}
                className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="text-lg font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                ref={(el) => (formRefs.current.lastName = el)}
                className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          {/* Contact Info */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={(el) => (formRefs.current.email = el)}
                className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="phone" className="text-lg font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                ref={(el) => (formRefs.current.phone = el)}
                className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          {/* Address */}
          <div>
            <label htmlFor="address" className="text-lg font-semibold text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              ref={(el) => (formRefs.current.address = el)}
              placeholder="Enter your address.."
              rows="3"
              className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
  
          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="text-lg font-semibold text-gray-700">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              ref={(el) => (formRefs.current.bloodGroup = el)}
              className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
  
          {/* Donation Date */}
          <div>
            <label htmlFor="donationDate" className="text-lg font-semibold text-gray-700">
              Last Donation Date
            </label>
            <input
              type="date"
              id="donationDate"
              ref={(el) => (formRefs.current.donationDate = el)}
              className="mt-2 w-full p-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-600 font-bold"> * Leave empty not donated blood before 6-months</p>
          </div>
  
          {/* Eligibility */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="eligibility"
              ref={(el) => (formRefs.current.eligibility = el)}
              className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded-lg"
            />
            <label htmlFor="eligibility" className="ml-2 text-lg text-gray-700">
              I confirm that I am eligible to donate blood.
            </label>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Submit Donation
          </button>
        </form>
      </>
    );
  }
  