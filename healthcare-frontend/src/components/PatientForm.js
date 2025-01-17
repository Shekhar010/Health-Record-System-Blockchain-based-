import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const PatientForm = ({ contract, accounts, setMessage }) => {
    const [patient, setPatient] = useState({
        name: "",
        age: "",
        medicalHistory: "",
    });

    const handleRegister = async () => {
        try {
            const { name, age, medicalHistory } = patient;
            if (!name || !age || !medicalHistory) {
                setMessage("All fields are required!");
                return;
            }
            setMessage("Registering patient...");
            await contract.methods
                .registerPatient(name, age, medicalHistory)
                .send({ from: accounts[0] });
            setMessage("Patient registered successfully!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Register Patient
                </Typography>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={patient.name}
                    onChange={(e) =>
                        setPatient({ ...patient, name: e.target.value })
                    }
                    sx={{ mb: 3 }}
                />
                <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    variant="outlined"
                    value={patient.age}
                    onChange={(e) =>
                        setPatient({ ...patient, age: e.target.value })
                    }
                    sx={{ mb: 3 }}
                />
                <TextField
                    fullWidth
                    label="Medical History"
                    variant="outlined"
                    value={patient.medicalHistory}
                    onChange={(e) =>
                        setPatient({ ...patient, medicalHistory: e.target.value })
                    }
                    multiline
                    rows={4}
                    sx={{ mb: 3 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                    sx={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        textTransform: "none",
                    }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default PatientForm;
