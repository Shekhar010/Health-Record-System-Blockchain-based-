import React from "react";
import { Container, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

// Styled components
const BackgroundContainer = styled(Box)({
    backgroundColor : "black",
    
    padding: "60px 0",  // Adding padding to avoid overlap with navbar
    display: "flex",
    width:1500,
    marginInlineStart:-325
});

const ContentBox = styled(Box)({
    textAlign: "center",
    maxWidth: "1200px",
    margin: "auto",
    padding: "40px",
    backgroundColor: "transparent",
    // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    position: "relative",
});

const SectionTitle = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1976d2",
    fontSize: "2rem",
});

const KeyFeatureCard = styled(Card)({
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
    },
});

const HomePage = () => {
    return (
        <BackgroundContainer>
            <Container maxWidth="lg">
                <ContentBox>
                    {/* Main Heading */}
                    <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}>
                        Blockchain Healthcare System
                    </Typography>

                    {/* Introduction Section */}
                    <Typography variant="h5" sx={{ mb: 3, color: "grey" }}>
                        Revolutionizing Healthcare with Blockchain Technology
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 6, color: "grey", fontSize: "1.1rem" }}>
                        Our Blockchain Healthcare System leverages blockchain technology to securely store and manage medical data,
                        ensuring transparency, security, and efficiency for both patients and healthcare professionals.
                    </Typography>

                    {/* What We Do Section */}
                    <Box sx={{ mb: 6 }}>
                        <SectionTitle variant="h5">What We Do</SectionTitle>
                        <Typography variant="body1" sx={{ color: "grey", fontSize: "1.1rem" }}>
                            We provide a platform where patients can securely store their medical records on the blockchain.
                            Patients control access to their data, while doctors and medical professionals can access it securely with consent.
                        </Typography>
                    </Box>

                    {/* Project Overview */}
                    <Box sx={{ mb: 6 }}>
                        <SectionTitle variant="h5">Project Overview</SectionTitle>
                        <Typography variant="body1" sx={{ color: "grey", fontSize: "1.1rem", lineHeight: "1.6" }}>
                            The Blockchain Healthcare System allows patients to have complete control over their medical data.
                            Blockchain technology ensures that the data is immutable, secure, and transparent. This platform helps both patients and doctors by providing a decentralized way to store and access health records.
                            The system is designed to improve the quality of healthcare by ensuring that medical data is accessible in real-time, facilitating faster and more accurate decision-making.
                        </Typography>
                    </Box>

                    {/* Key Features Section */}
                    <Box sx={{ mb: 6 }}>
                        <SectionTitle variant="h5">Key Features</SectionTitle>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={4}>
                                <KeyFeatureCard>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Secure Storage</Typography>
                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                            Patient records are securely stored on the blockchain, ensuring that the data cannot be altered or tampered with.
                                        </Typography>
                                    </CardContent>
                                </KeyFeatureCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <KeyFeatureCard>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Transparent Access</Typography>
                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                            Patients can control who accesses their medical data, ensuring transparency and trust.
                                        </Typography>
                                    </CardContent>
                                </KeyFeatureCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <KeyFeatureCard>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Efficient Healthcare</Typography>
                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                            Doctors can easily access patient data for faster diagnosis and treatment, improving the efficiency of healthcare.
                                        </Typography>
                                    </CardContent>
                                </KeyFeatureCard>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* How It Works Section */}
                    <Box sx={{ mb: 6 }}>
                        <SectionTitle variant="h5">How It Works</SectionTitle>
                        <Typography variant="body1" sx={{ mb: 3, color: "grey", fontSize: "1.1rem", lineHeight: "1.6" }}>
                            1. <strong>Patient Registration</strong>: Patients register on the platform by providing their personal details and medical history.<br />
                            2. <strong>Doctor Authorization</strong>: Doctors are authorized to access specific patient data as needed.<br />
                            3. <strong>Secure Storage on Blockchain</strong>: All medical records are securely stored on the blockchain, preventing data tampering.<br />
                            4. <strong>Access and Sharing</strong>: Doctors can access and share patient records with consent, improving care coordination.
                        </Typography>
                    </Box>

                    {/* Call to Action Section */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: "grey" }}>
                            Join the Blockchain Healthcare Revolution
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "200px",
                                padding: "12px",
                                fontSize: "16px",
                                textTransform: "none",
                                margin: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)"
                                }
                            }}
                            component={Link}
                            to="/register"
                        >
                            Register Now
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: "200px",
                                padding: "12px",
                                fontSize: "16px",
                                textTransform: "none",
                                margin: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    backgroundColor: "#757575",
                                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)"
                                }
                            }}
                            component={Link}
                            to="/details"
                        >
                            View Details
                        </Button>
                    </Box>
                </ContentBox>
            </Container>
        </BackgroundContainer>
    );
};

export default HomePage;
