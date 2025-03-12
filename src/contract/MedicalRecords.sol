// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MedicalRecords {
    struct Record {
        string name;
        string gender;
        uint256 age;
        string diagnosis;
        string prescription;
        string ipfsHash; // Optional for medical files
    }

    mapping(address => Record) private records; // Each patient owns their record
    mapping(address => address) public doctorAccess; // Stores assigned doctors
    mapping(address => bool) public doctors; // Store registered doctors
    mapping(address => bool) public patients; // Store registered patients

    event RecordUpdated(address indexed patient, string diagnosis, string prescription);
    event AccessGranted(address indexed patient, address doctor);
    event DoctorRegistered(address indexed doctor);
    event PatientRegistered(address indexed patient);

    // 🔹 Register as a doctor
    function registerDoctor() public {
        require(!doctors[msg.sender], "Already registered as a doctor!");
        doctors[msg.sender] = true;
        emit DoctorRegistered(msg.sender);
    }

    // 🔹 Register as a patient
    function registerPatient() public {
        require(!patients[msg.sender], "Already registered as a patient!");
        patients[msg.sender] = true;
        emit PatientRegistered(msg.sender);
    }

    // 🔹 Check if an address is a doctor
    function isDoctor(address _addr) public view returns (bool) {
        return doctors[_addr];
    }

    // 🔹 Check if an address is a patient
    function isPatient(address _addr) public view returns (bool) {
        return patients[_addr];
    }

    // 🔹 Patient sets their own record
    function setRecord(
        string memory _name,
        string memory _gender,
        uint256 _age,
        string memory _diagnosis,
        string memory _prescription,
        string memory _ipfsHash
    ) public {
        require(patients[msg.sender], "Not registered as a patient!");
        records[msg.sender] = Record(_name, _gender, _age, _diagnosis, _prescription, _ipfsHash);
        emit RecordUpdated(msg.sender, _diagnosis, _prescription);
    }

    // 🔹 Patient grants access to a doctor
    function grantAccess(address _doctor) public {
        require(patients[msg.sender], "Only patients can grant access!");
        require(doctors[_doctor], "Doctor not registered!");
        doctorAccess[msg.sender] = _doctor;
        emit AccessGranted(msg.sender, _doctor);
    }

    // 🔹 Doctor updates patient's record (only if granted access)
    function updateRecord(
        address _patient,
        string memory _diagnosis,
        string memory _prescription
    ) public {
        require(doctors[msg.sender], "Only doctors can update records!");
        require(doctorAccess[_patient] == msg.sender, "Not authorized!");
        records[_patient].diagnosis = _diagnosis;
        records[_patient].prescription = _prescription;
        emit RecordUpdated(_patient, _diagnosis, _prescription);
    }

    // 🔹 View own medical record
    function viewMyRecord() public view returns (
        string memory, string memory, uint256, string memory, string memory, string memory
    ) {
        require(patients[msg.sender], "Not registered as a patient!");
        Record memory record = records[msg.sender];
        return (record.name, record.gender, record.age, record.diagnosis, record.prescription, record.ipfsHash);
    }

    // 🔹 Doctor views patient record (only if granted access)
    function viewPatientRecord(address _patient) public view returns (
        string memory, string memory, uint256, string memory, string memory, string memory
    ) {
        require(doctors[msg.sender], "Only doctors can view records!");
        require(doctorAccess[_patient] == msg.sender, "Not authorized!");
        Record memory record = records[_patient];
        return (record.name, record.gender, record.age, record.diagnosis, record.prescription, record.ipfsHash);
    }
}
