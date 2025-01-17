// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Healthcare {
    struct Patient {
        string name;
        uint age;
        string medicalHistory;
        address[] authorizedDoctors;
    }

    struct Doctor {
        string name;
        bool isRegistered;
    }

    address[] private patientsList;
    mapping(address => Patient) private patients;
    mapping(address => Doctor) private doctors;
    mapping(address => mapping(address => bool)) public authorizedDoctors; // patient => doctor => authorization
    address private admin;

    event PatientRegistered(address indexed patient, string name);
    event PatientUpdated(address indexed patient, string updatedField);
    event DoctorRegistered(address indexed doctor, string name);
    event DoctorAuthorized(address indexed patient, address indexed doctor);
    event DoctorRevoked(address indexed patient, address indexed doctor);
    event EmergencyAccess(address indexed patient, address indexed admin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(
            doctors[msg.sender].isRegistered,
            "Only registered doctors can perform this action"
        );
        _;
    }

    modifier onlyPatientOrAuthorizedDoctor(address _patientAddress) {
        require(
            msg.sender == _patientAddress ||
                authorizedDoctors[_patientAddress][msg.sender],
            "Unauthorized access"
        );
        _;
    }

    constructor() {
        admin = 0xDBfF52f7A22A6242061124b70FA7B01aB8D3C062; // Set admin address of the Metamask address
    }

    // Set the admin
    function setAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }

    // Register a patient
    function registerPatient(
        string memory _name,
        uint _age,
        string memory _medicalHistory
    ) public {
        require(
            bytes(patients[msg.sender].name).length == 0,
            "Patient already registered."
        );

        // Save the patient's details in the mapping
        patients[msg.sender] = Patient({
            name: _name,
            age: _age,
            medicalHistory: _medicalHistory,
            authorizedDoctors: new address[](0)  // properly initialize as an empty array
        });

        // Add the patient's address to the list
        patientsList.push(msg.sender);

        emit PatientRegistered(msg.sender, _name);
    }

    // Register a doctor (only admin)
    function registerDoctor(
        address _doctorAddress,
        string memory _name
    ) public onlyAdmin {
        require(
            !doctors[_doctorAddress].isRegistered,
            "Doctor already registered."
        );
        doctors[_doctorAddress] = Doctor(_name, true);
        emit DoctorRegistered(_doctorAddress, _name);
    }

    // Authorize a doctor
    function authorizeDoctor(address _doctor) public {
        require(
            bytes(patients[msg.sender].name).length > 0,
            "Patient not registered."
        );
        require(doctors[_doctor].isRegistered, "Doctor is not registered.");
        require(
            !authorizedDoctors[msg.sender][_doctor],
            "Doctor already authorized."
        );

        authorizedDoctors[msg.sender][_doctor] = true;
        patients[msg.sender].authorizedDoctors.push(_doctor);
        emit DoctorAuthorized(msg.sender, _doctor);
    }

    // Revoke doctor's access
    function revokeDoctorAccess(address _doctor) public {
        require(
            authorizedDoctors[msg.sender][_doctor],
            "Doctor not authorized."
        );
        authorizedDoctors[msg.sender][_doctor] = false;
        emit DoctorRevoked(msg.sender, _doctor);
    }

    // Get patient details (restricted to patient and authorized doctors)
    function getPatientDetails(
        address _patientAddress
    )
        public
        view
        onlyPatientOrAuthorizedDoctor(_patientAddress)
        returns (string memory, uint, string memory)
    {
        Patient memory patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not registered.");
        return (patient.name, patient.age, patient.medicalHistory);
    }

    // Update medical history (only patient)
    function updateMedicalHistory(string memory _newMedicalHistory) public {
        require(
            bytes(patients[msg.sender].name).length > 0,
            "Patient not registered."
        );
        patients[msg.sender].medicalHistory = _newMedicalHistory;
        emit PatientUpdated(msg.sender, "medicalHistory");
    }

    // View authorized doctors for a patient
    function getAuthorizedDoctors(
        address _patientAddress
    ) public view returns (address[] memory) {
        return patients[_patientAddress].authorizedDoctors;
    }

    // View all patients who authorized a doctor
    function getPatientsForDoctor(
        address _doctor
    ) public view onlyDoctor returns (address[] memory) {
        uint count = 0;

        // Count how many patients have authorized the doctor
        for (uint i = 0; i < patientsList.length; i++) {
            if (authorizedDoctors[patientsList[i]][_doctor]) {
                count++;
            }
        }

        // Create an array of the appropriate size
        address[] memory authorizedPatients = new address[](count);
        uint index = 0;

        // Populate the array with authorized patients
        for (uint i = 0; i < patientsList.length; i++) {
            if (authorizedDoctors[patientsList[i]][_doctor]) {
                authorizedPatients[index] = patientsList[i];
                index++;
            }
        }

        return authorizedPatients;
    }

    // Emergency access (only admin)
    function emergencyAccess(
        address _patientAddress
    ) public onlyAdmin returns (string memory, uint, string memory) {
        Patient memory patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not registered.");
        emit EmergencyAccess(_patientAddress, msg.sender);
        return (patient.name, patient.age, patient.medicalHistory);
    }
}
