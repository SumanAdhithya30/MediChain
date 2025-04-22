import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pt-16 font-sans text-gray-800">
      {/* Hero Section */}
{/* Hero Section */}
<section className="bg-blue-50 py-16 px-4 flex flex-col md:flex-row items-center justify-between">
  <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 flex flex-col items-center">
    <h1 className="text-5xl font-extrabold leading-tight text-blue-700 text-center">
      Revolutionizing Healthcare with Blockchain
    </h1>
    <p className="mt-6 text-lg text-gray-700 max-w-xl text-center">
      Welcome to MediChain – your gateway to secure, decentralized, and transparent healthcare record management. 
      Empowering both patients and doctors, we ensure that your health data is owned and accessible only by you. 
      Say goodbye to data silos and hello to modern, efficient, and tamper-proof healthcare experiences.
    </p>
    <button 
      onClick={() => navigate("/login")}
      className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition duration-300"
    >
      Get Started
    </button>
  </div>
  <div className="md:w-1/2">
    <img 
      src="src\assets\istockphoto-1301652887-2048x2048.jpg" 
      alt="Healthcare illustration" 
      className="w-full max-w-3xl rounded-xl shadow-lg"
    />
  </div>
</section>


      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">Why Choose MediChain?</h2>
        <p className="max-w-3xl mx-auto text-lg mb-12">
          MediChain ensures privacy, ownership, and instant access to health data using cutting-edge blockchain technology. Our platform bridges the gap between patients, doctors, and institutions with complete transparency.
        </p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Data Ownership</h4>
            <p>Patients have full control over their records, deciding who can access and modify them.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Tamper-Proof Records</h4>
            <p>Blockchain makes all records immutable, ensuring the highest level of trust and security.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Accessible Anywhere</h4>
            <p>Secure cloud-based storage allows access to your health records anytime, from any device.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">How It Works</h2>
        <p className="max-w-3xl mx-auto text-lg mb-10">
          Our platform is built on Ethereum-based smart contracts. Patients log in using their unique blockchain wallet, manage their records securely, and doctors can request access to update health data in a transparent and verifiable way.
        </p>
        <img 
          src="src\assets\blockchain_healthcare_square.png "
          alt="Workflow"
          className="mx-auto rounded-lg shadow-lg w-80 md:w-[500px]"
        />
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">What Users Say</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg shadow">
            <p>"MediChain changed the way I manage my health data. I feel empowered and in control."</p>
            <p className="mt-4 font-semibold">– Sarah, Patient</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <p>"As a doctor, I now get authorized access instantly without paperwork. It's efficient and secure."</p>
            <p className="mt-4 font-semibold">– Dr. Mehta</p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <p>"The blockchain-based system gives us confidence in record integrity across our hospital chain."</p>
            <p className="mt-4 font-semibold">– IT Admin, LifePlus Hospital</p>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Latest Updates</h2>
        <div className="space-y-6 max-w-3xl mx-auto text-left">
          <div>
            <h4 className="font-semibold text-lg">🌐 MediChain v2.0 Launching Soon!</h4>
            <p>We're introducing AI diagnostics and faster gas-free transactions on Layer 2 networks.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">📄 Smart Contract Audited</h4>
            <p>Independent audit confirms zero vulnerabilities in MediChain’s core contracts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">🤝 Partnership with HealthNet</h4>
            <p>MediChain is joining hands with HealthNet to onboard 100+ hospitals in Q2.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Start Your Journey with MediChain</h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Whether you're a patient or a doctor, MediChain empowers you with the tools to manage healthcare securely and efficiently. Join the revolution now!
        </p>
        <button 
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Join Now
        </button>
      </section>
    </div>
  );
}

export default HomePage;
