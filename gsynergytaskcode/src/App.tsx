import React from "react";
import Navbar from "./components/navbarcomponent"; 
import { AuthProvider } from "./context/authcontext"; 

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </>
  );
};

export default App;
