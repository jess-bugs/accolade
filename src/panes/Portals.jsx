import SiteLogo from '../assets/images/JessB.jpg'
import BrandLogo from '../assets/images/WorkspaceLogo.png'
import { NavLink } from 'react-router-dom'
import PortalSiteCard from '../components/PortalSiteCard'
import { use, useState } from 'react'

import { FaPlusCircle } from "react-icons/fa";



const Portals = () => {


    const [createNote, setCreateNote] = useState(false);
    const [defaultProtocol, setDefaultProtocol] = useState('http');

    let site_name = 'Site Name'
    let site_description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta nobis ratione labore minima numquam modi eos odio doloribus vitae!'

    return (
        <div className="p-2">
            <h2 className="fw-bold">Manage Portals</h2>

            {/* create portal div */}
            {createNote && (
                <div className="h-100 d-flex flex-column">
                    <div  style={{marginTop : '5%'}}>
                        <form>

                            {/* create portal <div> */}
                            <div className="rounded h-100 d-flex flex-column theme-border-upper-right theme-border-black-left p-3 col-lg-6 mx-auto mt-5">
                                <h2 className="fw-bold">Create Portal</h2>



                                {/* site name */}
                                <div className="mt-4">
                                    <p className='mb-0'>Site Name</p>
                                    <input className="form-control form-control-sm" type="text" placeholder='My Website'></input>
                                </div>

                                {/* site logo */}
                                <div className="mt-4">
                                    <p className='mb-1'>Site Logo</p>
                                    <input className="form-control" type="file"></input>
                                    <small>.ico, .png, .jpg</small>
                                </div>

                                {/* site description */}
                                <div className="mt-4">
                                    <p className='mb-0'>Description</p>
                                    <input className="form-control form-control-sm" type="text"></input>
                                </div>

                                {/* site URL */}
                                <div className="mt-4">
                                    <p className='mb-0'>Site URL</p>
                                    <div className="input-group mb-3">
                                        <button
                                            className="btn btn-outline-secondary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {defaultProtocol}
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <a onClick={() => setDefaultProtocol('http://')} className="dropdown-item" href="#">
                                                    http://
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => setDefaultProtocol('https://')} className="dropdown-item" href="#">
                                                    https://
                                                </a>
                                            </li>
                                        </ul>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="Text input with dropdown button"
                                        />
                                    </div>
                                </div>




                                <div className="mt-auto">
                                    {/* cancel button */}
                                    <div className="d-flex justify-content-end">
                                        <button onClick={() => setCreateNote(false)} className="btn btn-danger me-3">Cancel</button>
                                        <button onClick={() => setCreateNote(false)} className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                            </div>
                        </form>


                    </div>


                </div>
            )}


            {!createNote && (
                <div className="mt-5">
                    <div className="row g-2">
                        <PortalSiteCard site_url='https://google.com/' site_logo={BrandLogo} site_name="Guacamole Portal" site_description={site_description} />
                        <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="aaPanel Web Host" site_description={site_description} />
                        <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="Proxmox" site_description={site_description} />
                        <PortalSiteCard site_url='https://google.com/' site_logo={SiteLogo} site_name="Landing Page" site_description={site_description} />
                        <PortalSiteCard site_logo={SiteLogo} site_name="Sandbox" />

                        {/* data-bs-toggle="modal" data-bs-target="#exampleModal" */}
                        <div onClick={() => setCreateNote(true)} style={{ cursor: 'pointer', minHeight: '200px' }} className="col-xl-4 text-decoration-none link link-dark">
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
            )}
            
        </div>
    )
}

export default Portals