import SiteLogo from '../assets/images/JessB.jpg'
import AccoladeLogo from '/src/assets/images/AccoladeLogo.webp'
import { useNavigate, NavLink } from 'react-router-dom'
import PortalSiteCard from '../components/PortalSiteCard'
import { useState, useEffect, useRef } from 'react'

import axios from 'axios';

import { FaPlusCircle } from "react-icons/fa";

import Swal from 'sweetalert2';



const Portals = () => {
    const closeModal = useRef(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    // for portal logo file input
    const fileInputRef = useRef(null);

    const [portals, setPortals] = useState([]);

    let fetch_portals = () => {

        axios.get('https://accoladeapi.jessbaggs.com/api/portals',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {

                // console.log(response.data);

                // if(!response.data.success) {
                //     localStorage.removeItem('token');
                //     navigate('/login');
                //     return;
                // }


                setPortals(response.data)
            })

            .catch((error) => console.error('Error:', error))
    }

    useEffect(() => {


        if (!token) {
            navigate('/login');
            return;
        }

        fetch_portals();

        const interval = setInterval(fetch_portals, 1000);

        return () => clearInterval(interval);



    }, []);


    const [createNote, setCreateNote] = useState(false);
    const [defaultProtocol, setDefaultProtocol] = useState('https://');

    const [siteName, setSiteName] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [url, setURL] = useState('');
    const [siteLogo, setSiteLogo] = useState(null);

    const fileChange = (event) => {
        setSiteLogo(event.target.files[0]);
    }



    // function to send New Portal to API endpoint
    const [isSubmitted, setIsSubmitted] = useState(false);

    let createNewPortal = (e) => {
        e.preventDefault();

        setIsSubmitted(true);

        const formData = new FormData();
        formData.append('site_name', siteName);
        formData.append('site_description', siteDescription);
        formData.append('site_URL', defaultProtocol + url);

        if (siteLogo) {
            formData.append('site_Logo', siteLogo);
        }

        axios.post('https://accoladeapi.jessbaggs.com/api/create-new-portal', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                if (!response.data.success) {
                    return Swal.fire({
                        title: 'Request Error',
                        text: 'Error: ' + response.data.error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }


                Swal.fire({
                    title: 'Success!',
                    text: 'Portal Inserted!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                // close Create Portal Block
                setCreateNote(false);

                // load all portals
                fetch_portals();

                setIsSubmitted(false);

                // close the modal
                closeModal.current.click();


                // reset fields
                resetPortalFields();



            })
            .catch(error => {
                console.error(error);
            });



    }



    // function to send Remove Portal to API endpoint
    let removePortal = (portal_id) => {

        Swal.fire({
            title: 'Remove Portal',
            text: 'Would you like to remove this Portal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK'
        })
            .then((result) => {
                if (result.isConfirmed) {

                    axios.delete('https://accoladeapi.jessbaggs.com/api/remove-portal/' + portal_id,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                        .then(response => {

                            console.log(response.data);

                            if (!response.data.success) {
                                Swal.fire({
                                    title: 'Request Error',
                                    text: 'Error: ' + response.data.error,
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                })
                                return;
                            }

                            setPortals(response.data.data);

                        })
                        .catch(err => console.log('Error: ', err))

                }
            });
    }




    
    function resetPortalFields() {
        setSiteName('');
        setSiteDescription('');
        setURL('');
        setSiteLogo(null);
        fileInputRef.current.value = '';
        setDefaultProtocol('https://');
    }


    return (
        <div className="p-2">
            <div className="d-flex align-items-center">
                <h2 className="fw-bold">Manage Portals</h2>

                <div className="ms-auto">
                    <button data-bs-toggle="modal" data-bs-target="#create-portal-modal" className="btn theme-btn-default">
                        <FaPlusCircle className="" /> Create Portal
                    </button>
                </div>
            </div>

            {/* create portal div */}
            {createNote && (
                <div className="h-100 d-flex flex-column">
                    <div  >
                        <form onSubmit={createNewPortal}>

                            {/* create portal <div> */}
                            <div className="rounded h-100 d-flex flex-column border-top border-bottom border-muted p-3 col-lg-6 mx-auto mt-5">
                                <h2 className="fw-bold">Create Portal</h2>

                                {/* site name */}
                                <div className="mt-4">
                                    <p className='mb-0'>Site Name</p>
                                    <input required onChange={(e) => { setSiteName(e.target.value) }} className="form-control form-control-sm" type="text" placeholder='My Website'></input>
                                </div>

                                {/* site logo */}
                                <div className="mt-4">
                                    <p className='mb-1'>Site Logo</p>
                                    <input accept='.webp, .jpg, .jpeg, .png' required onChange={fileChange} className="form-control" type="file"></input>
                                    <small>.webp, .png, .jpg, .jpeg</small>
                                </div>

                                {/* site description */}
                                <div className="mt-4">
                                    <p className='mb-0'>Description</p>
                                    <input onChange={(e) => { setSiteDescription(e.target.value) }} className="form-control form-control-sm" type="text"></input>
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
                                            onChange={(e) => { setURL(e.target.value) }}
                                            type="text"
                                            className="form-control"
                                            aria-label="Text input with dropdown button"
                                        />
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="d-flex justify-content-end">
                                        <button onClick={() => setCreateNote(false)} className="btn btn-danger me-3">Cancel</button>
                                        <button disabled={isSubmitted} className="btn theme-btn-default">Save</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>


                </div>
            )}


            {!createNote && (
                <div className="mt-4">
                    <div className="row g-2">

                        <div className="d-grid">
                            <button data-bs-toggle="modal" data-bs-target="#create-portal-modal" className="btn theme-btn-default d-lg-none"><FaPlusCircle/> Create Portal</button>
                        </div>

                        {/* loads all portals */}
                        {portals.map((portal, index) => (
                            <PortalSiteCard 
                            key={portal.ID} 
                            site_url={portal.URL} 
                            site_logo={'https://accoladeapi.jessbaggs.com/portal-logos/' + portal.Logo} 
                            site_name={portal.Site} 
                            site_description={portal.Description} 
                            portal_id={portal.ID} 
                            removePortal={removePortal} 
                            />
                        ))}


                        {/* <div data-bs-toggle="modal" data-bs-target="#create-portal-modal" style={{ cursor: 'pointer', minHeight: '200px' }} className="d-none d-lg-block col-xl-4 text-decoration-none link link-dark">
                            <div style={{ border: '2px dashed grey' }} className="h-100 rounded d-flex flex-column">
                                <div className="text-center my-auto">
                                    <h1 className="display-3">
                                        <FaPlusCircle className="theme-color" />
                                    </h1>
                                    <p className="text-center">Add Another Portal</p>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            )}





            <div className="modal fade" id="create-portal-modal" tabIndex="-1" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">


                        <div className="modal-body p-2">
                            <div className="row g-1">
                                <div className="col-md-5 border border-muted rounded d-none d-lg-block">
                                    <div className="text-center">
                                        <img src={AccoladeLogo} style={{ height: '120px' }} alt="accolade-logo" />
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="text-center">
                                            Create New Portal
                                        </h4>
                                        <p className="text-center">This page lets you create a new portal.</p>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="d-flex">
                                        <h4 className="fw-bold d-lg-none">Create Portal</h4>
                                        <div className="ms-auto">
                                            <button onClick={resetPortalFields} type="button" ref={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    </div>

                                    <form onSubmit={createNewPortal} className='p-2'>

                                        {/* create portal <div> */}
                                        <div className="rounded h-100 d-flex flex-column">
                                            {/* site name */}
                                            <div className="">
                                                <p className='mb-0'>Site Name</p>
                                                <input value={siteName} required onChange={(e) => { setSiteName(e.target.value) }} className="form-control form-control-sm" type="text" placeholder='My Website'></input>
                                            </div>

                                            {/* site logo */}
                                            <div className="mt-4">
                                                <p className='mb-1'>Site Logo</p>
                                                <input ref={fileInputRef} accept='.webp, .jpg, .jpeg, .png' required onChange={fileChange} className="form-control" type="file"></input>
                                                <small>.webp, .png, .jpg, .jpeg</small>
                                            </div>

                                            {/* site description */}
                                            <div className="mt-4">
                                                <p className='mb-0'>Description</p>
                                                <input value={siteDescription} onChange={(e) => { setSiteDescription(e.target.value) }} className="form-control form-control-sm" type="text"></input>
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
                                                        value={url}
                                                        onChange={(e) => { setURL(e.target.value) }}
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
                                                        <button disabled={isSubmitted} className="btn btn-sm theme-btn-default">Save</button>
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


        </div>
    )
}

export default Portals