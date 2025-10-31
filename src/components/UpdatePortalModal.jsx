import React from 'react'
import { Modal, Button } from "react-bootstrap";
import AccoladeLogo from './AccoladeLogo';


const UpdatePortalModal = ({ show, onClose, site_name }) => {


    return (
        <>
            <Modal size='lg' show={show} onHide={onClose} centered>
                <Modal.Body>
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
                                <div className="ms-auto">
                                    <button type="button" className="btn-close" aria-label="Close"></button>
                                </div>
                            </div>

                            <form className='p-2'>
                                <div className="rounded h-100 d-flex flex-column">

                                    {/* site name */}
                                    <div className="">
                                        <p className='mb-0'>Site Name</p>
                                        <input value={site_name} onChange={(e) => setSiteName(e.target.value)} required className="form-control form-control-sm" type="text" placeholder='My Website'></input>
                                    </div>

                                    
                                </div>
                            </form>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdatePortalModal