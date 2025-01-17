import React, { useState, useEffect } from "react";

const DoctorPatients = ({ contract, accounts, setMessage }) => {
    const [patients, setPatients] = useState([]);

    const fetchAuthorizedPatients = async () => {
        try {
            setMessage("Fetching authorized patients...");
            const authorizedPatients = await contract.methods.getPatientsForDoctor(accounts[0]).call();
            setPatients(authorizedPatients);
            setMessage("Authorized patients fetched successfully!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchAuthorizedPatients();
    }, [accounts]);

    return (
        <div>
            <h3>Your Authorized Patients</h3>
            {patients.length === 0 ? (
                <p>No patients have authorized you yet.</p>
            ) : (
                <ul>
                    {patients.map((patient, index) => (
                        <li key={index}>{patient}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorPatients;
