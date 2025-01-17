import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, styled } from "@mui/material";

// style the background container
const BackgroundContainer = styled(Box)({
    backgroundColor: "black",

    padding: "60px 0",  // Adding padding to avoid overlap with navbar
    display: "flex",
    width: 1500,
    marginInlineStart: -325
})

const AdminPanel = ({ contract, accounts, setMessage }) => {
    const [doctorAddress, setDoctorAddress] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [newAdmin, setNewAdmin] = useState("");

    const handleRegisterDoctor = async () => {
        try {
            if (!doctorAddress || !doctorName) {
                setMessage("Doctor address and name are required!");
                return;
            }

            setMessage("Registering doctor...");
            await contract.methods
                .registerDoctor(doctorAddress, doctorName)
                .send({ from: accounts[0] });
            setMessage("Doctor registered successfully!");
        } catch (error) {
            if (error.code === 4001) {
                setMessage("Transaction rejected by user.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    const handleSetAdmin = async () => {
        try {
            if (!newAdmin) {
                setMessage("New admin address is required!");
                return;
            }

            setMessage("Setting new admin...");
            await contract.methods.setAdmin(newAdmin).send({ from: accounts[0] });
            setMessage("New admin set successfully!");
        } catch (error) {
            if (error.code === 4001) {
                setMessage("Transaction rejected by user.");
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <BackgroundContainer>
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Typography variant="h4" sx={{ mb: 4, color: "#1976d2", fontWeight: 'bold' }}  >
                        Admin Panel
                    </Typography>

                    {/* Register Doctor Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ mb: 2 , color:'white'}}>
                            Register Doctor
                        </Typography>
                        <TextField
                            fullWidth
                            label="Doctor Address"
                            variant="outlined"
                            value={doctorAddress}
                            onChange={(e) => setDoctorAddress(e.target.value)}
                            sx={{ mb: 3,
                                "& .MuiInputLabel-root": { color: 'white' }, // Label color
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: 'white' }, // Border color
                                    "&:hover fieldset": { borderColor: '#1976d2' }, // Hover border color
                                    "&.Mui-focused fieldset": { borderColor: '#1976d2' }, // Focused border color
                                },
                                "& .MuiInputBase-input": { color: 'white' }, // Input text color 
                                }}
                        />
                        <TextField
                            fullWidth
                            label="Doctor Name"
                            variant="outlined"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            sx={{ mb: 3 ,
                                "& .MuiInputLabel-root": { color: 'white' }, // Label color
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: 'white' }, // Border color
                                    "&:hover fieldset": { borderColor: '#1976d2' }, // Hover border color
                                    "&.Mui-focused fieldset": { borderColor: '#1976d2' }, // Focused border color
                                },
                                "& .MuiInputBase-input": { color: 'white' }, // Input text color
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRegisterDoctor}
                            sx={{
                                width: "100%",
                                padding: "12px",
                                fontSize: "16px",
                                textTransform: "none",
                            }}
                        >
                            Register Doctor
                        </Button>
                    </Box>

                    {/* Set New Admin Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Set New Admin
                        </Typography>
                        <TextField
                            fullWidth
                            label="New Admin Address"
                            variant="outlined"
                            value={newAdmin}
                            onChange={(e) => setNewAdmin(e.target.value)}
                            sx={{ mb: 3,
                                "& .MuiInputLabel-root": { color: 'white' }, // Label color
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: 'white' }, // Border color
                                    "&:hover fieldset": { borderColor: '#1976d2' }, // Hover border color
                                    "&.Mui-focused fieldset": { borderColor: '#1976d2' }, // Focused border color
                                },
                                "& .MuiInputBase-input": { color: 'white' }, // Input text color
                             }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSetAdmin}
                            sx={{
                                width: "100%",
                                padding: "12px",
                                fontSize: "16px",
                                textTransform: "none",
                            }}
                        >
                            Set Admin
                        </Button>
                    </Box>
                </Box>
            </Container>
        </BackgroundContainer>
    );
};

export default AdminPanel;
