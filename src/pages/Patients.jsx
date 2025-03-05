import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";

function Patients() {
  const [patientData, setPatientData] = useState({
    name: "",
    gender: "",
    age: "",
    diagnosis: "",
    prescription: "",
    ipfsHash: "",
  });

  const [doctorAddress, setDoctorAddress] = useState("");
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
      console.log("Fetched record:", record);
      setPatientRecord({
        name: record[0],
        gender: record[1],
        age: record[2],
        diagnosis: record[3],
        prescription: record[4],
        ipfsHash: record[5],
      });
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Patient Actions</h2>

      {/* Set Record Form */}
      <form
        onSubmit={handleSetRecord}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold mb-4">Set Your Medical Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={patientData.name}
            onChange={(e) =>
              setPatientData({ ...patientData, name: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Gender"
            value={patientData.gender}
            onChange={(e) =>
              setPatientData({ ...patientData, gender: e.target.value })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Age"
            value={patientData.age}
            onChange={(e) =>
              setPatientData({ ...patientData, age: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Diagnosis"
            value={patientData.diagnosis}
            onChange={(e) =>
              setPatientData({ ...patientData, diagnosis: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Prescription"
            value={patientData.prescription}
            onChange={(e) =>
              setPatientData({ ...patientData, prescription: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="IPFS Hash (Optional)"
            value={patientData.ipfsHash}
            onChange={(e) =>
              setPatientData({ ...patientData, ipfsHash: e.target.value })
            }
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-primary mt-4">
          Save Record
        </button>
      </form>

      {/* Grant Doctor Access Form */}
      <form
        onSubmit={handleGrantAccess}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold mb-4">Grant Doctor Access</h3>
        <input
          type="text"
          placeholder="Doctor's Address"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          className="input-field w-full"
        />
        <button type="submit" className="btn-primary mt-4">
          Grant Access
        </button>
      </form>

      {/* View Record Button */}
      <button onClick={handleViewRecord} className="btn-secondary">
        View My Record
      </button>

      {patientRecord && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Your Record</h3>
          <p><strong>Name:</strong> {patientRecord.name}</p>
          <p><strong>Gender:</strong> {patientRecord.gender}</p>
          <p><strong>Age:</strong> {patientRecord.age}</p>
          <p><strong>Diagnosis:</strong> {patientRecord.diagnosis}</p>
          <p><strong>Prescription:</strong> {patientRecord.prescription}</p>
          <p><strong>IPFS Hash:</strong> {patientRecord.ipfsHash}</p>
        </div>
      )}
    </div>
  );
}

export default Patients;
