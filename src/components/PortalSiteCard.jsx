import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';

import UpdatePortalModal from './UpdatePortalModal';
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
    updatePortal
}) => {


    const token = localStorage.getItem('token');
    const [imageSrc, setImageSrc] = useState(null);
    const [defaultProtocol, setDefaultProtocol] = useState('https://');


    const [siteName, setSiteName] = useState(site_name);


    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);



    function update_portal() {

        console.log('Portal Site: ', site_name);

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


        setSiteName(site_name);

    }, [site_name])



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
                            {/* Edit */}
                            <span onClick={openModal} style={{ cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#update-portal-offcanvas"  className='fs-5 me-2'><CiEdit /></span>

                            {/* Delete */}
                            <span style={{ cursor: 'pointer' }} onClick={() => removePortal(portal_id)} className='fs-5 text-danger me-2'><MdDelete /></span>

                            {/* Copy Link */}
                            <span title='Copy URL' style={{ cursor: 'pointer' }} onClick={handleCopy} className='fs-5'><CiLink /></span>

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



            <UpdatePortalModal show={showModal} onClose={closeModal} site_name={site_name}/>


            {/* modal for updating Portal Information */}
            
            <div className="modal fade" id="update-portal-modal" tabIndex="-1" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">


                        
                    </div>
                </div>
            </div>



            {/* offcanvas */}
            {/* <div class="offcanvas offcanvas-start" tabindex="-1" id="update-portal-offcanvas" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p className="fw-bold">{siteName}</p>
                </div>
            </div> */}

        </>
    )
}

export default PortalSiteCard