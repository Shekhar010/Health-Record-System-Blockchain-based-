import React, { useState } from "react";
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";


const PatientDetails = ({ contract, accounts, setMessage }) => {
    const [patientDetails, setPatientDetails] = useState(null);

    const fetchPatientDetails = async () => {
        try {
            setMessage("Fetching patient details...");
            const details = await contract.methods.getPatientDetails(accounts[0]).call({ from: accounts[0] });
            setPatientDetails({
                name: details[0],
                age: details[1],
                medicalHistory: details[2],
            });
            setMessage("Patient details fetched successfully!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Patient Details
                </Typography>

                {/* Button to Fetch Patient Details */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={fetchPatientDetails}
                    sx={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        textTransform: "none",
                        mb: 4,
                    }}
                >
                    Fetch Details
                </Button>

                {/* Display Patient Details in a Table */}
                {patientDetails && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Field</strong></TableCell>
                                    <TableCell><strong>Details</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell>{patientDetails.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Age</strong></TableCell>
                                    <TableCell>{patientDetails.age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Medical History</strong></TableCell>
                                    <TableCell>{patientDetails.medicalHistory}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Container>
    );
};

export default PatientDetails;
