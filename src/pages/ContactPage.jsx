import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Contact Us
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Have any questions or concerns? We’re here to help! Reach out to us
        through any of the following channels.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-blue-500 text-xl mr-3" />
          <p className="text-gray-800">
            <strong>Email:</strong> support@medichain.com
          </p>
        </div>

        <div className="flex items-center mb-4">
          <FaPhone className="text-green-500 text-xl mr-3" />
          <p className="text-gray-800">
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
        </div>

        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-red-500 text-xl mr-3" />
          <p className="text-gray-800">
            <strong>Address:</strong> 123 Healthcare Street, Sathyabama, Chennai
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Send Us a Message</h2>
        <p className="text-gray-600 mb-4">
          Fill out the form below, and we'll get back to you as soon as
          possible.
        </p>

        <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
