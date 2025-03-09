import React from 'react'
import Navbar from "../src/components/navbarcomponent"
import { AuthProvider } from './context/authcontext';
const App = () => {
  return (
    <>
  <AuthProvider>
  <Navbar />
</AuthProvider>


    </>
  )
}

export default App