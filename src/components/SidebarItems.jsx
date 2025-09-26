import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { FaEquals } from "react-icons/fa";
import { FaIgloo } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";




const SidebarItems = () => {

  const dir_path = useLocation();
  const [activeLink, setActiveLink] = useState("/dashboard");


  return (
    <>
      <div className="p-3">
        {/* Dashboard */}
        <div className="mb-3 d-grid">
          <NavLink onClick={() => setActiveLink('/dashboard')} to={'/dash/dashboard'} className={activeLink === '/dashboard' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
            <FaEquals /> <span className="fw-bold w-100">Dashboard</span>
          </NavLink>
        </div>

        {/* Portals */}
        <div className="mb-2 d-grid">
          <NavLink onClick={() => setActiveLink('/portal')} to={'/dash/portal'} className={() => activeLink === '/portal' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
            <FaIgloo /> <span className="fw-bold w-100">Portals</span>
          </NavLink>
        </div>

        {/* Site Stat */}
        <div className="mb-2 d-grid">
          <NavLink onClick={() => setActiveLink('/site-stat')} to={'/dash/site-stat'} className={() => activeLink === '/site-stat' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
            <FaChartLine /> <span className="fw-bold w-100">Site Stat</span>
          </NavLink>
        </div>

        {/* Accounts */}
        <div className="mb-2 d-grid">
          <NavLink onClick={() => setActiveLink('/accounts')} to={'/dash/accounts'} className={() => activeLink === '/accounts' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
            <FaUserCircle /> <span className="fw-bold w-100">Accounts</span>
          </NavLink>
        </div>

      </div>
    </>
  )
}

export default SidebarItems