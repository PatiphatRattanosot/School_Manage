import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import React from "react";
import Navbar from "./Navbar";
import TopNavbar from '../components/TopNavbar';

function Layout() {
  return (
    
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <TopNavbar/>
        <Navbar />
        <main className="flex-grow my-12">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default Layout;