import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const DoctorAuthorization = ({ contract, accounts, setMessage }) => {
    const [doctorAddress, setDoctorAddress] = useState("");

    const handleAuthorize = async () => {
        try {
            if (!doctorAddress) {
                setMessage("Doctor address is required!");
                return;
            }
            setMessage("Authorizing doctor...");
            await contract.methods
                .authorizeDoctor(doctorAddress)
                .send({ from: accounts[0] });
            setMessage("Doctor authorized successfully!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Authorize Doctor
                </Typography>

                <TextField
                    fullWidth
                    label="Doctor Address"
                    variant="outlined"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAuthorize}
                    sx={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        textTransform: "none",
                    }}
                >
                    Authorize
                </Button>
            </Box>
        </Container>
    );
};

export default DoctorAuthorization;
