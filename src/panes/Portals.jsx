import SiteLogo from '../assets/images/JessB.jpg'
import BrandLogo from '../assets/images/WorkspaceLogo.png'
import { useNavigate, NavLink } from 'react-router-dom'
import PortalSiteCard from '../components/PortalSiteCard'
import { use, useState, useEffect } from 'react'

import axios from 'axios';

import { FaPlusCircle } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Portals = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [portals, setPortals] = useState([]);

    let fetch_portals = () => {
        axios.get('https://accoladeapi.jessbaggs.com/api/portals')
            .then((response) => setPortals(response.data))
            .catch((error) => console.error('Error:', error))

    }

    useEffect(() => {
        
        if(!token) {
            navigate('/login');
            return;
        }
        
        fetch_portals();

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
    let createNewPortal = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('site_name', siteName);
        formData.append('site_description', siteDescription);
        formData.append('site_URL', defaultProtocol + url);

        if (siteLogo) {
            formData.append('site_Logo', siteLogo);
        }

        axios.post('https://accoladeapi.jessbaggs.com/api/create-new-portal', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.success) {

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

                }
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

                    axios.delete('https://accoladeapi.jessbaggs.com/api/remove-portal/' + portal_id)
                        .then(response => {

                            if (response.data.success) {
                                setPortals(response.data.data);
                            }

                        })
                        .catch(err => console.log('Error: ', err))

                }
            });
    }




    return (
        <div className="p-2">
            <div className="d-flex align-items-center">
                <h2 className="fw-bold">Manage Portals</h2>

                <div className="ms-auto">
                    <button onClick={fetch_portals} className="btn btn-sm btn-primary">
                        Refresh
                    </button>
                </div>
            </div>

            {/* create portal div */}
            {createNote && (
                <div className="h-100 d-flex flex-column">
                    <div  >
                        <form onSubmit={createNewPortal}>

                            {/* create portal <div> */}
                            <div className="rounded h-100 d-flex flex-column theme-border-upper-right theme-border-black-left p-3 col-lg-6 mx-auto mt-5">
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
                                        <button className="btn theme-btn-default">Save</button>
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


                        {/* loads all portals */}
                        {portals.map((portal, index) => (
                            <PortalSiteCard key={index} site_url={portal.URL} site_logo={'https://accoladeapi.jessbaggs.com/portal-logos/' + portal.Logo} site_name={portal.Site} site_description={portal.Description} portal_id={portal.ID} removePortal={removePortal} />
                        ))}


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