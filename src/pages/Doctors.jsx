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
    console.log("Fetching record for patient with address:", patientAddress);
  
    // Validate patient address using ethers v6 method
    if (!ethers.isAddress(patientAddress)) {
      setError("Invalid patient address format!");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Check if doctor has access to the patient's record
      const doctorAddress = await signer.getAddress();
      const accessDoctor = await contract.doctorAccess(patientAddress);
      
      console.log("Doctor address:", doctorAddress);
      console.log("Access granted to:", accessDoctor);
      
      if (accessDoctor.toLowerCase() !== doctorAddress.toLowerCase()) {
        setError("You do not have access to this patient's record.");
        return;
      }
  
      // Fetch patient record
      const record = await contract.viewPatientRecord(patientAddress);
      console.log("Fetched patient record:", record);
  
      setPatientRecord({
        name: record[0],
        gender: record[1],
        age: record[2].toString(),
        diagnosis: record[3],
        prescription: record[4],
        ipfsHash: record[5],
      });
    } catch (error) {
      console.error('Error fetching record:', error);
      setError(`Error: ${error.message || "Failed to fetch record"}`);
    }
  };

  // Handle updating a patient's record
  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    console.log("Updating record for patient:", updatePatientAddress);
  
    // Validate patient address using ethers v6 method
    if (!ethers.isAddress(updatePatientAddress)) {
      setError("Invalid patient address format!");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Check if doctor has access to update the record
      const doctorAddress = await signer.getAddress();
      const accessDoctor = await contract.doctorAccess(updatePatientAddress);
      
      if (accessDoctor.toLowerCase() !== doctorAddress.toLowerCase()) {
        setError("You do not have access to update this patient's record.");
        return;
      }
  
      // Update the patient's record
      const tx = await contract.updateRecord(updatePatientAddress, doctorDiagnosis, doctorPrescription);
      await tx.wait();
      setSuccessMessage("Patient record updated successfully!");
      
      // Clear form fields after successful update
      setDoctorDiagnosis('');
      setDoctorPrescription('');
    } catch (error) {
      console.error("Error updating record:", error);
      setError(`Error: ${error.message || "Failed to update record"}`);
    }
  };

  return (
    <div className="container">
      <h2>Doctor Actions</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      {/* View Patient Record Form */}
      <div className="form-section">
        <h3>View Patient Record</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleViewRecord(); }}>
          <div className="form-field">
            <label>Patient's Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">View Record</button>
        </form>
      </div>

      {patientRecord && (
        <div className="record-display">
          <h3>Patient Record</h3>
          <div className="record-field">
            <strong>Name:</strong> {patientRecord.name}
          </div>
          <div className="record-field">
            <strong>Gender:</strong> {patientRecord.gender}
          </div>
          <div className="record-field">
            <strong>Age:</strong> {patientRecord.age}
          </div>
          <div className="record-field">
            <strong>Diagnosis:</strong> {patientRecord.diagnosis}
          </div>
          <div className="record-field">
            <strong>Prescription:</strong> {patientRecord.prescription}
          </div>
          <div className="record-field">
            <strong>IPFS Hash:</strong> {patientRecord.ipfsHash}
          </div>
        </div>
      )}

      {/* Update Patient Record Form */}
      <div className="form-section">
        <h3>Update Patient Record</h3>
        <form onSubmit={handleUpdateRecord}>
          <div className="form-field">
            <label>Patient's Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={updatePatientAddress}
              onChange={(e) => setUpdatePatientAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>New Diagnosis:</label>
            <textarea
              placeholder="Enter updated diagnosis"
              value={doctorDiagnosis}
              onChange={(e) => setDoctorDiagnosis(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>New Prescription:</label>
            <textarea
              placeholder="Enter updated prescription"
              value={doctorPrescription}
              onChange={(e) => setDoctorPrescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Record</button>
        </form>
      </div>
    </div>
  );
}

export default Doctors;