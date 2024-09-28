import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import React from "react";
import Navbar from "./Navbar";
import TopNavbar from '../components/TopNavbar';
import { NewsProvider } from "../context/NewsContext";
import { DepartmentProvider } from "../context/DepartmentContext";
import { PersonProvider } from "../context/PersonnelContext";

function Layout() {
  return (
    <PersonProvider>
      <DepartmentProvider>
        <AuthProvider>
          <NewsProvider>



            <div className="flex flex-col min-h-screen">
              <TopNavbar />
              <Navbar />
              <main className="flex-grow my-12">
                <Outlet />
              </main>
            </div>



          </NewsProvider>
        </AuthProvider>
      </DepartmentProvider>
    </PersonProvider>
  );
}

export default Layout;