import React from "react";
import Navbar from "./components/navbarcomponent"; 
import { AuthProvider } from "./context/authcontext"; 
import HomeComponent from "./pages/homecomponent";
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';



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
