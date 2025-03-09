import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

function HomePage() {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-blue-100 text-center p-10">
        <h2 className="text-4xl font-bold">Secure & Decentralized Healthcare</h2>
        <p className="mt-4">MediChain provides a blockchain-based solution for secure medical records.</p>
        <button 
          onClick={() => navigate("/login")} // ✅ Redirect to Login Page
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Why Choose MediChain?</h3>
        <p className="mt-2">Providing security, transparency, and accessibility for medical records.</p>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 p-10 text-center">
        <h3 className="text-3xl font-semibold">How It Works</h3>
        <p className="mt-2">Patients own their records, and doctors can update them securely.</p>
      </section>

      {/* Testimonials */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Testimonials</h3>
        <p className="mt-2">See what our users say about MediChain.</p>
      </section>

      {/* Latest News */}
      <section className="bg-gray-100 p-10 text-center">
        <h3 className="text-3xl font-semibold">Latest Updates</h3>
        <p className="mt-2">Stay updated with our latest developments.</p>
      </section>

      {/* Call to Action */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Get Started Today</h3>
        <p className="mt-2">Join MediChain and experience secure healthcare management.</p>
      </section>
    </div>
  );
}

export default HomePage;
