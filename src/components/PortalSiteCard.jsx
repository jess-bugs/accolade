import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';

import Swal from 'sweetalert2';

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiLink } from "react-icons/ci";




const PortalSiteCard = ({
    site_logo,
    site_name = 'A Website',
    site_description = 'No description provided.',
    site_url = 'site-1',
    portal_id,
    removePortal,
    updatePortal
}) => {


    const token = localStorage.getItem('token');
    const [imageSrc, setImageSrc] = useState(null);


    const [protocol, setProtocol] = useState(site_url.startsWith('http://') ? 'http://' : 'https://');

    const [updatePortal, setUpdatePortal] = useState(false);
    const [portalID, setPortalID] = useState(portal_id);
    const [siteName, setSiteName] = useState(site_name);
    const [siteDescription, setSiteDescription] = useState(site_description);
    const [siteURL, setSiteURL] = useState(site_url.replace(/^https?:\/\//, ''));



    const handleCopy = () => {
        navigator.clipboard.writeText(site_url)
            .then(() => {
                Swal.fire({
                    text: 'URL copied to clipboard!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };



    useEffect(() => {

        const fetch_image = async () => {
            try {

                const response = await axios.get(site_logo,
                    {
                        responseType: 'blob',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                const imgURL = URL.createObjectURL(response.data);
                setImageSrc(imgURL);

            } catch (error) {
                console.error('Image fetching error: ', error);
            }
        }

        fetch_image();


        setSiteName(site_name);

    }, [site_name])





    function sendUpdatePortal() {

        const site_data = new FormData();
        site_data.append('portal_id', portalID);
        site_data.append('site_name', siteName);
        site_data.append('site_description', siteDescription);
        site_data.append('site_URL', protocol + siteURL);


        axios.post('https://accoladeapi.jessbaggs.com/api/update-portal/', site_data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                {

                    console.log(response.data);
                    if (!response.data.success) {
                        return Swal.fire({
                            title: 'Request Error',
                            text: 'Error: ' + response.data.error,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }


                    // doesn't seem to be working...
                    setSiteName(prev => response.data.site_name || prev);
                    setSiteDescription(prev => response.data.site_description || prev);
                    setSiteURL(prev => response.data.site_URL || prev);
                    setUpdatePortal(false);

                    
                    // for debugging only...
                    // Swal.fire({
                    //     title: 'Success!',
                    //     text: response.data.message,
                    //     icon: 'success',
                    //     confirmButtonText: 'OK'
                    // })
                }
            })
            .catch(err => console.log('Update Request Error: ', err));
    }


    return (
        <>
            <div className="col-sm-6 col-xl-4 text-decoration-none link link-dark">
                <div className="d-flex flex-column rounded theme-border-upper-right theme-border-black-left p-2 shadow" style={{ minHeight: '200px' }}>

                    {/* site logo and name */}
                    <div className="d-flex">
                        <img src={imageSrc} className="standard_circle_image theme-border me-2" style={{ height: '30px', cursor: 'pointer', width: '30px' }} alt="Site-Logo" />

                        <p className="fw-bold fs-5">
                            {site_name}
                        </p>

                        <div className="ms-auto d-flex">

                            {/* Edit */}
                            <span onClick={() => updatePortal ? setUpdatePortal(false) : setUpdatePortal(true)} style={{ cursor: 'pointer' }} className='fs-5 me-2'><CiEdit /></span>

                            {/* Delete */}
                            <span style={{ cursor: 'pointer' }} onClick={() => removePortal(portal_id)} className='fs-5 text-danger me-2'><MdDelete /></span>

                            {/* Copy URL */}
                            <span title='Copy URL' style={{ cursor: 'pointer' }} onClick={handleCopy} className='fs-5'><CiLink /></span>

                        </div>
                    </div>


                    {/* description */}
                    {!updatePortal && (
                        <p className="mt-3">
                            <span className="fw-bold">Description</span>
                            <br />
                            {site_description}
                        </p>
                    )}



            <UpdatePortalModal show={showModal} onClose={closeModal} site_name={site_name}/>


                    {updatePortal && (
                        <div className="h-100 p-1 d-flex flex-column">


                            {/* update site name */}
                            <div className="mb-3">
                                <div className="input-group ">
                                    <span className="input-group-text border border-secondary" id="basic-addon1">Site Name</span>
                                    <input
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        type="text"
                                        className="form-control form-control-sm border border-secondary"
                                    />
                                </div>
                            </div>

                            {/* update site description */}
                            <div className="mb-3">
                                <p className="mb-1">Site Description</p>
                                <textarea value={siteDescription} onChange={(e) => { setSiteDescription(e.target.value) }} rows="3" id="" className="form-control form-control-sm border border-secondary"></textarea>
                            </div>


                            {/* update site URL */}
                            <p className="mb-1">Site URL</p>
                            <div className="input-group mb-3">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {protocol}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink onClick={() => setProtocol('http://')} className='dropdown-item bg-light text-dark'>
                                            http://
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => setProtocol('https://')} className='dropdown-item bg-light text-dark'>
                                            https://
                                        </NavLink>
                                    </li>
                                </ul>
                                <input
                                    value={siteURL}
                                    onChange={(e) => { setSiteURL(e.target.value) }}
                                    type="text"
                                    className="form-control form-control-sm border border-secondary"
                                    aria-label="Text input with dropdown button"
                                />
                            </div>

                            <div className="mt-auto text-end">
                                <button onClick={() => { setUpdatePortal(false) }} className="btn btn-sm btn-danger me-2">Cancel</button>
                                <button onClick={() => sendUpdatePortal()} className="btn btn-sm btn-primary">Submit</button>
                            </div>
                        </div>
                    )}



                    {!updatePortal && (
                        <div className="mt-auto d-flex justify-content-end">
                            <div className="ms-auto">
                                <NavLink to={site_url} target='_blank' className="btn btn-sm btn-outline-info" >Visit <FaArrowRightLong /></NavLink>
                            </div>
                        </div>
                    )}



                </div>

            </div>




        </>
    )
}

export default PortalSiteCard