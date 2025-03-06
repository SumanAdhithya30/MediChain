import React from "react";

function HomePage() {
  return (
    <div className="pt-16"> {/* Padding to push content below the fixed navbar */}
      {/* Hero Section */}
      <section className="bg-blue-100 text-center p-10">
        <h2 className="text-4xl font-bold">Secure & Decentralized Healthcare</h2>
        <p className="mt-4">MediChain provides a blockchain-based solution for secure medical records.</p>
      </section>
      <br></br>
      {/* Features Section */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Why Choose MediChain?</h3>
        <p className="mt-2">Providing security, transparency, and accessibility for medical records.</p>
      </section>
      <br></br>
      {/* How It Works */}
      <section className="bg-gray-100 p-10 text-center">
        <h3 className="text-3xl font-semibold">How It Works</h3>
        <p className="mt-2">Patients own their records, and doctors can update them securely.</p>
      </section>
      <br></br>
      {/* Testimonials */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Testimonials</h3>
        <p className="mt-2">See what our users say about MediChain.</p>
      </section>
      <br></br>
      {/* Latest News */}
      <section className="bg-gray-100 p-10 text-center">
        <h3 className="text-3xl font-semibold">Latest Updates</h3>
        <p className="mt-2">Stay updated with our latest developments.</p>
      </section>
      <br></br>
      {/* Call to Action */}
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold">Get Started Today</h3>
        <p className="mt-2">Join MediChain and experience secure healthcare management.</p>
      </section>
    </div>
  );
}

export default HomePage;

