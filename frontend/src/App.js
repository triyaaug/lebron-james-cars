import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <h1>Lebron James Cars</h1> 
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
