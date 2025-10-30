import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';

import AccoladeLogo from './AccoladeLogo';
import { event } from 'jquery';
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
    portalInfo
}) => {


    const token = localStorage.getItem('token');
    const [imageSrc, setImageSrc] = useState(null);
    const [defaultProtocol, setDefaultProtocol] = useState('https://');


    const [siteName, setSiteName] = useState('');



    function update_portal() {

        setSiteName(portalInfo.siteName);
        console.log('Portal Site: ', siteName);
    }



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

    }, [])



    return (
        <>
            <div className="col-sm-6 col-xl-4 text-decoration-none link link-dark">
                <div className="h-100 d-flex flex-column rounded theme-border-upper-right theme-border-black-left p-2 shadow" style={{ minHeight: '200px' }}>

                    {/* site logo and name */}
                    <div className="d-flex">
                        <img src={imageSrc} className="standard_circle_image theme-border me-2" style={{ height: '30px', width: '30px' }} alt="Site-Logo" />

                        <p className="fw-bold fs-5">
                            {site_name}
                        </p>

                        <div className="ms-auto d-flex">
                            <span style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#update-portal-modal" className='fs-5 me-2'><CiEdit /></span>
                            <span style={{ cursor: 'pointer' }} onClick={() => removePortal(portal_id)} className='fs-5 text-danger me-2'><MdDelete /></span>
                            <span title='Copy URL' style={{ cursor: 'pointer' }} onClick={handleCopy} className='fs-5'><CiLink /></span>
                            {/* <NavLink target='_blank' to={site_url} className={'link link-info'}>Visit Portal <FaArrowRightLong /></NavLink> */}
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
                            {/* <button onClick={() => removePortal(portal_id)} className="btn btn-danger btn-sm">Remove</button> */}
                        </div>

                        <div className="me-2">
                            {/* <button onClick={update_portal} data-bs-toggle="modal" data-bs-target="#update-portal-modal" className="btn btn-sm btn-primary">Edit</button> */}
                        </div>

                        <div className="ms-auto">
                            <NavLink to={site_url} target='_blank' className="btn btn-sm btn-outline-info" >Visit <FaArrowRightLong /></NavLink>
                        </div>
                    </div>
                </div>

            </div>




            {/* modal for updating Portal Information */}
            <div className="modal fade" id="update-portal-modal" tabIndex="-1" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">


                        <div className="modal-body p-2">
                            <div className="row g-1">
                                <div className="col-md-5 border border-muted rounded d-none d-lg-block">
                                    <div className="text-center">
                                        <AccoladeLogo height={'120px'} />
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="text-center">
                                            Update Portal Information
                                        </h4>
                                        <p className="text-center">This page lets you update your portal.</p>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="d-flex">
                                        <h5 className="fw-bold">Portal ID : <span className="fw-normal">{portal_id}</span></h5>
                                        <div className="ms-auto">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    </div>

                                    <form className='p-2'>

                                        {/* create portal <div> */}
                                        <div className="rounded h-100 d-flex flex-column">

                                            {/* site name */}
                                            <div className="">
                                                <p className='mb-0'>Site Name</p>
                                                <input value={portalInfo.siteName} onChange={(e) => { setSiteName(e.target.value) }} required className="form-control form-control-sm" type="text" placeholder='My Website'></input>
                                            </div>

                                            {/* site logo */}
                                            <div className="mt-4">
                                                <p className='mb-1'>Site Logo</p>
                                                <input accept='.webp, .jpg, .jpeg, .png' required className="form-control" type="file"></input>
                                                <small>.webp, .png, .jpg, .jpeg</small>
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
                                                            <NavLink onClick={() => setDefaultProtocol('http://')} className='dropdown-item bg-light text-dark'>
                                                                http://
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink onClick={() => setDefaultProtocol('https://')} className='dropdown-item bg-light text-dark'>
                                                                https://
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        aria-label="Text input with dropdown button"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="row g-1">
                                                    <div className="col d-grid">
                                                        <button type='button' data-bs-dismiss="modal" className="btn btn-sm btn-outline-danger">Cancel</button>
                                                    </div>
                                                    <div className="col d-grid">
                                                        <button className="btn btn-sm theme-btn-default">Save</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default PortalSiteCard