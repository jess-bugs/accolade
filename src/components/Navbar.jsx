import React from 'react'
import SidebarItems from './SidebarItems'

const Navbar = () => {
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

                <div className="ms-auto d-none d-lg-block">
                    <button className="btn btn-dark rounded-5 me-2">
                        Hello
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar