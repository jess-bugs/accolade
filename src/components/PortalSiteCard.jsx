import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";


const PortalSiteCard = ({ 
    site_logo, site_name = 'A Website', 
    site_description = 'No description provided.', 
    site_url = 'site-1', 
    portal_id, 
    removePortal }) => {

    



    return (
        <>
            <div className="col-sm-6 col-xl-4 text-decoration-none link link-dark">
                <div className="h-100 d-flex flex-column rounded theme-border-upper-right theme-border-black-left p-2 shadow" style={{ minHeight: '200px' }}>

                    {/* site logo and name */}
                    <div className="d-flex">
                        <img src={site_logo} className="standard_circle_image theme-border me-2" style={{ height: '30px', width: '30px' }} alt="Site-Logo" />

                        <p className="fw-bold fs-5">
                            {site_name}
                        </p>

                        <div className="ms-auto">
                            <NavLink target='_blank' to={site_url} className={'link link-info'}>Visit Portal <FaArrowRightLong /></NavLink>
                        </div>
                    </div>

                    {/* description */}
                    <p className="mt-3">
                        <span className="fw-bold">Description</span>
                        <br />
                        {site_description}
                    </p>

                    <div className="mt-auto d-flex justify-content-end">
                        <div className="me-2">
                            <button onClick={()=>removePortal(portal_id)} className="btn btn-danger btn-sm">Remove</button>
                        </div>

                        <div className="me-2">
                            <button className="btn btn-sm btn-primary">Edit</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PortalSiteCard