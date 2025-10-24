import React from 'react'
import { useNavigate } from 'react-router-dom';
import SidebarItems from './SidebarItems'
import Swal from 'sweetalert2';

import { IoPower } from "react-icons/io5";


const Navbar = () => {

    const navigate = useNavigate();

    let logout = () => {
        Swal.fire({
            title: 'Logout?',
            text: 'Do you really want to logout?',
            icon: 'warning',
            confirmButtonText: 'OK'
        })
        .then((result) => {
            if(result.isConfirmed) {

                localStorage.removeItem('token');
                navigate('/login');
            }
        })
    }

    return (
        <div className="">
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-muted">
                <div className="container-fluid d-lg-none">

                    <a className="navbar-brand" href="#">Navbar</a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#workspace-nav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="workspace-nav">
                        <div className="mt-2">
                            <SidebarItems />
                        </div>
                    </div>

                </div>

                <div className="ms-auto d-none d-lg-flex">
                    <div className="me-2">
                        <button onClick={logout} className="btn btn-outline-danger rounded-5 me-2">
                            <IoPower /> Logout
                        </button>
                    </div>
                    <button className="btn btn-dark rounded-5 me-2">
                        Hello
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar