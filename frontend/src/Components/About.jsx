import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-4xl font-semibold text-blue-600 mb-8 text-center">
        About Our Organization
      </h2>

      {/* Main Content */}
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h3>
        <p className="text-lg text-gray-700 mb-6">
          We are a dedicated non-profit organization committed to making a positive impact on the health
          and well-being of communities by facilitating the donation and distribution of blood. Our mission
          is to ensure a reliable and sustainable blood supply to hospitals, clinics, and individuals in need
          through the efforts of our generous donors.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is simple: to save lives. Every day, individuals across the world face life-threatening
          emergencies, surgeries, and medical conditions that require blood. We aim to create a seamless
          platform that connects blood donors with those in need, ensuring that no one has to suffer due to a
          lack of resources. Our goal is to raise awareness, encourage regular donations, and make it easier
          for people to contribute to this life-saving cause.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
        <p className="text-lg text-gray-700 mb-6">
          We envision a world where no patient in need of blood goes without. Through collaboration with
          hospitals, clinics, and donors, we strive to create a global community of individuals who are
          passionate about making a difference. We aim to be the leading platform for blood donation, ensuring
          that every blood request is met in a timely manner with the help of our compassionate donors.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
          <li>**Compassion**: We believe in the power of giving and the impact that one donation can make.</li>
          <li>**Community**: We are committed to building a network of blood donors who care about saving lives.</li>
          <li>**Transparency**: We ensure that all donations and requests are tracked and handled with full transparency.</li>
          <li>**Sustainability**: We aim to create long-term solutions for the consistent availability of blood.</li>
          <li>**Health & Safety**: We prioritize the health and safety of both donors and recipients throughout the process.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">How We Operate</h3>
        <p className="text-lg text-gray-700 mb-6">
          Our system allows individuals to register as blood donors, track available blood units, and easily
          request blood when needed. We partner with hospitals and clinics to ensure that the blood reaches
          those who need it the most, especially in emergency situations. The process is simple and efficient,
          allowing donors to contribute with ease and recipients to receive blood without delays.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Join Us in Saving Lives</h3>
        <p className="text-lg text-gray-700 mb-6">
          We invite you to join our organization in making a tangible difference in the lives of those in need.
          Whether you're a potential donor, a healthcare provider, or someone interested in supporting our cause,
          your involvement is invaluable. Together, we can ensure that no one has to go without blood when they
          need it the most.
        </p>

        <div className="flex justify-center">
          <a
            href="/sign-up"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Become a Donor
          </a>
        </div>
      </div>
    </div>
  );
}
