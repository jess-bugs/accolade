
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEquals } from "react-icons/fa";
import { FaIgloo } from "react-icons/fa";



const SideBarItems = () => {
  const [activeLink, setActiveLink] = useState('dashboard');


    return (
        <>
            <div className="p-3">

                {/* Dashboard */}
                <div className="mb-3 d-grid">
                    <NavLink onClick={() => setActiveLink('dashboard')} to={'/dash/dashboard'} className={() => activeLink === 'dashboard' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
                        <FaEquals /> <span className="fw-bold w-100">Dashboarder</span>
                    </NavLink>
                </div>


                {/* Portals */}
                <div className="mb-2 d-grid"> 
                    <NavLink onClick={() => activeLink !== 'portals' && setActiveLink('portals')} to={'/dash/portals'} className={() => activeLink === 'portals' ? 'link link-light bg-dark p-2 rounded-5 text-decoration-none' : 'link link-dark p-2 rounded-5 text-decoration-none'}>
                        <FaIgloo /> <span className="fw-bold w-100">Portals</span>
                    </NavLink>
                </div>


            </div>
        </>
    )
    
}

export default SideBarItems