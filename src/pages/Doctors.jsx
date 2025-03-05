import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from "../utils/constants";

function Doctors() {
  const [patientAddress, setPatientAddress] = useState('');
  const [doctorDiagnosis, setDoctorDiagnosis] = useState('');
  const [doctorPrescription, setDoctorPrescription] = useState('');
  const [patientRecord, setPatientRecord] = useState(null);
  const [updatePatientAddress, setUpdatePatientAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle viewing a patient's record
  const handleViewRecord = async () => {
    setError('');
    setPatientRecord(null);
  
    if (!ethers.isAddress(patientAddress)) {
      setError("Invalid patient address format!");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const doctorAddress = await signer.getAddress();
      const accessDoctor = await contract.doctorAccess(patientAddress);
      
      if (accessDoctor.toLowerCase() !== doctorAddress.toLowerCase()) {
        setError("You do not have access to this patient's record.");
        return;
      }
  
      const record = await contract.viewPatientRecord(patientAddress);
  
      setPatientRecord({
        name: record[0],
        gender: record[1],
        age: record[2].toString(),
        diagnosis: record[3],
        prescription: record[4],
        ipfsHash: record[5],
      });
    } catch (error) {
      setError(`Error: ${error.message || "Failed to fetch record"}`);
    }
  };

  // Handle updating a patient's record
  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (!ethers.isAddress(updatePatientAddress)) {
      setError("Invalid patient address format!");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const doctorAddress = await signer.getAddress();
      const accessDoctor = await contract.doctorAccess(updatePatientAddress);
      
      if (accessDoctor.toLowerCase() !== doctorAddress.toLowerCase()) {
        setError("You do not have access to update this patient's record.");
        return;
      }
  
      const tx = await contract.updateRecord(updatePatientAddress, doctorDiagnosis, doctorPrescription);
      await tx.wait();
      setSuccessMessage("Patient record updated successfully!");
      
      setDoctorDiagnosis('');
      setDoctorPrescription('');
    } catch (error) {
      setError(`Error: ${error.message || "Failed to update record"}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Doctor Actions</h2>

      {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
      {successMessage && <div className="text-green-600 font-semibold text-center">{successMessage}</div>}
      
      {/* View Patient Record Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">View Patient Record</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleViewRecord(); }} className="space-y-4">
          <div>
            <label className="block text-gray-600">Patient's Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            View Record
          </button>
        </form>
      </div>

      {patientRecord && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Patient Record</h3>
          <div className="space-y-2">
            <div><strong>Name:</strong> {patientRecord.name}</div>
            <div><strong>Gender:</strong> {patientRecord.gender}</div>
            <div><strong>Age:</strong> {patientRecord.age}</div>
            <div><strong>Diagnosis:</strong> {patientRecord.diagnosis}</div>
            <div><strong>Prescription:</strong> {patientRecord.prescription}</div>
            <div><strong>IPFS Hash:</strong> {patientRecord.ipfsHash}</div>
          </div>
        </div>
      )}

      {/* Update Patient Record Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Update Patient Record</h3>
        <form onSubmit={handleUpdateRecord} className="space-y-4">
          <div>
            <label className="block text-gray-600">Patient's Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={updatePatientAddress}
              onChange={(e) => setUpdatePatientAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600">New Diagnosis:</label>
            <textarea
              placeholder="Enter updated diagnosis"
              value={doctorDiagnosis}
              onChange={(e) => setDoctorDiagnosis(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600">New Prescription:</label>
            <textarea
              placeholder="Enter updated prescription"
              value={doctorPrescription}
              onChange={(e) => setDoctorPrescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Update Record
          </button>
        </form>
      </div>
    </div>
  );
}

export default Doctors;
