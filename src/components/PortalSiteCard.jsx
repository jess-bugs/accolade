import React from 'react'
import { NavLink } from 'react-router-dom'

const PortalSiteCard = ({site_logo, site_name='A Website', site_description='No description provided.', site_url='site-1'}) => {
    return (
        <>
            <NavLink to={site_url} className="col-xl-4 text-decoration-none link link-dark">
                <div className="h-100 rounded theme-border-upper-right theme-border-black-left p-2 shadow" style={{ minHeight: '200px' }}>

                    {/* site logo and name */}
                    <div className="d-flex">
                        <img src={site_logo} className="standard_circle_image theme-border me-2" style={{ height: '30px', width: '30px' }} alt="Site-Logo" />

                        <p className="fw-bold fs-5">
                            {site_name}
                        </p>
                    </div>

                    {/* description */}
                    <p className="mt-3">
                        <span className="fw-bold">Description</span>
                        <br />
                        {site_description}
                    </p>
                </div>
            </NavLink>
        </>
    )
}

export default PortalSiteCard