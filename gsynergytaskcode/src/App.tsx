import React from "react";
import Navbar from "./components/navbarcomponent"; 
import { AuthProvider } from "./context/authcontext"; 
import HomeComponent from "./pages/homecomponent";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <HomeComponent/>
      </AuthProvider>
    </>
  );
};

export default App;
