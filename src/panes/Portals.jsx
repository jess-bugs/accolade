import React from 'react'
import { useRef } from "react";
import SiteLogo from '../assets/images/JessB.jpg'
import BrandLogo from '../assets/images/WorkspaceLogo.png'
import { NavLink } from 'react-router-dom'
import PortalSiteCard from '../components/PortalSiteCard'


import { FaPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';




const Portals = () => {


    let site_name = 'Site Name'
    let site_description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta nobis ratione labore minima numquam modi eos odio doloribus vitae!'

    return (
        <div className="p-2">
            <h2 className="fw-bold">Manage Portals</h2>


            <div className="mt-5">
                <div className="row g-2">
                    <PortalSiteCard site_url='https://google.com/' site_logo={BrandLogo} site_name="Guacamole Portal" site_description={site_description} />
                    <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="aaPanel Web Host" site_description={site_description} />
                    <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="Proxmox" site_description={site_description} />
                    <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="Landing Page" site_description={site_description} />
                    <PortalSiteCard site_logo={SiteLogo} site_name="Sandbox" />

                    <div data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: 'pointer', minHeight: '200px' }} className="col-xl-4 text-decoration-none link link-dark">
                        <div style={{ border: '2px dashed grey' }} className="h-100 rounded d-flex flex-column">
                            <div className="text-center my-auto">
                                <h1 className="display-3">
                                    <FaPlusCircle className="theme-color" />
                                </h1>
                                <p className="text-center">Add Another Portal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Portals