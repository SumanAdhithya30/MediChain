import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from "../utils/constants";


function Patients() {
  const [patientData, setPatientData] = useState({
    name: '',
    gender: '',
    age: '',
    diagnosis: '',
    prescription: '',
    ipfsHash: '',
  });

  const [doctorAddress, setDoctorAddress] = useState('');
  const [patientRecord, setPatientRecord] = useState(null);

  // Handle setting the patient's record
  const handleSetRecord = async (e) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.setRecord(
      patientData.name,
      patientData.gender,
      patientData.age,
      patientData.diagnosis,
      patientData.prescription,
      patientData.ipfsHash
    );
    await tx.wait();
    console.log("Record set successfully!");
  };

  // Handle granting access to a doctor
  const handleGrantAccess = async (e) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.grantAccess(doctorAddress);
    await tx.wait();
    console.log("Access granted to doctor!");
  };

  // Handle viewing patient's own record
  const handleViewRecord = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    try {
      const record = await contract.viewMyRecord();
      console.log("Fetched record:", record); // Log the full returned data
      setPatientRecord({
        name: record[0],
        gender: record[1],
        age: record[2],
        diagnosis: record[3],
        prescription: record[4],
        ipfsHash: record[5],
      });
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Patient Actions</h2>
      
      {/* Set Record Form */}
      <form onSubmit={handleSetRecord}>
        <h3>Set Your Medical Record</h3>
        <input
          type="text"
          placeholder="Name"
          value={patientData.name}
          onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={patientData.gender}
          onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={patientData.age}
          onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={patientData.diagnosis}
          onChange={(e) => setPatientData({ ...patientData, diagnosis: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prescription"
          value={patientData.prescription}
          onChange={(e) => setPatientData({ ...patientData, prescription: e.target.value })}
        />
        <input
          type="text"
          placeholder="IPFS Hash (Optional)"
          value={patientData.ipfsHash}
          onChange={(e) => setPatientData({ ...patientData, ipfsHash: e.target.value })}
        />
        <button type="submit">Save Record</button>
      </form>

      {/* Grant Doctor Access Form */}
      <form onSubmit={handleGrantAccess}>
        <h3>Grant Doctor Access</h3>
        <input
          type="text"
          placeholder="Doctor's Address"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
        />
        <button type="submit">Grant Access</button>
      </form>

      {/* View Record Button */}
      <button onClick={handleViewRecord}>View My Record</button>
      {patientRecord && (
        <div>
          <h3>Your Record</h3>
          <p>Name: {patientRecord.name}</p>
          <p>Gender: {patientRecord.gender}</p>
          <p>Age: {patientRecord.age}</p>
          <p>Diagnosis: {patientRecord.diagnosis}</p>
          <p>Prescription: {patientRecord.prescription}</p>
          <p>IPFS Hash: {patientRecord.ipfsHash}</p>
        </div>
      )}
    </div>
  );
}

export default Patients;
