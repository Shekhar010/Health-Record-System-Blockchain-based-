import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getWeb3, getContract } from "./utils/web3";
import {
    Container,
    Typography,
    Alert,
    Button,
    Box,
    AppBar,
    Toolbar,
} from "@mui/material";

// Import your components
import PatientForm from "./components/PatientForm";
import PatientDetails from "./components/PatientDetails";
import DoctorAuthorization from "./components/DoctorAuthorization";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./components/HomePage"; 

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const init = async () => {
            try {
                const web3Instance = await getWeb3();
                const accounts = await web3Instance.eth.getAccounts();
                const contractInstance = await getContract(web3Instance);

                setWeb3(web3Instance);
                setAccounts(accounts);
                setContract(contractInstance);
                setMessage("Connected to blockchain.");
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        };

        init();

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (newAccounts) => {
                setAccounts(newAccounts);
                setMessage(`Switched to account: ${newAccounts[0]}`);
            });
        }
    }, []);

    return (
        <Router>
            <Box>
                {/* Navigation Bar */}
                <AppBar position="static" sx={{ mb: 4 }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Blockchain Healthcare System
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register Patient
                        </Button>
                        <Button color="inherit" component={Link} to="/details"> 
                            View Details
                        </Button>
                        <Button color="inherit" component={Link} to="/authorize">
                            Doctor Authorization
                        </Button>
                        {/* <Button color="inherit" component={Link} to="/doctor">
                            Doctor Patients
                        </Button> */}
                        <Button color="inherit" component={Link} to="/admin">
                            Admin Panel
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="md">
                    {message && (
                        <Alert severity={message.startsWith("Error") ? "error" : "info"} sx={{ mb: 3 }}>
                            {message}
                        </Alert>
                    )}
                    

                    <Routes>
                        {/* Routes for Different Pages */}
                        <Route
                            path="/"
                            element={
                                // <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                                //     Welcome to Blockchain Healthcare System
                                // </Typography>

                                // incorporate the home page 
                                <HomePage/>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PatientForm
                                    web3={web3}
                                    accounts={accounts}
                                    contract={contract}
                                    setMessage={setMessage}
                                />
                            }
                        />
                        <Route
                            path="/details"
                            element={
                                <PatientDetails
                                    web3={web3}
                                    accounts={accounts}
                                    contract={contract}
                                    setMessage={setMessage}
                                />
                            }
                        />
                        <Route
                            path="/authorize"
                            element={
                                <DoctorAuthorization
                                    web3={web3}
                                    accounts={accounts}
                                    contract={contract}
                                    setMessage={setMessage}
                                />
                            }
                        />
                        {/* <Route
                            path="/doctor"
                            element={
                                <DoctorPatients
                                    web3={web3}
                                    accounts={accounts}
                                    contract={contract}
                                    setMessage={setMessage}
                                />
                            }
                        /> */}
                        <Route
                            path="/admin"
                            element={
                                <AdminPanel
                                    web3={web3}
                                    accounts={accounts}
                                    contract={contract}
                                    setMessage={setMessage}
                                />
                            }
                        />
                    </Routes>
                </Container>
            </Box>
        </Router>
    );
};

export default App;
