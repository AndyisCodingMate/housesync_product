import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandlordDashboard from "./LandlordDashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;