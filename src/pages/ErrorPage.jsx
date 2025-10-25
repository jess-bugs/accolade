import React from 'react'

const ErrorPage = () => {
  return (
    <>
    <div className="col-md-6 mx-auto min-vh-100 d-flex flex-column">
        <div className="p-1 my-auto">
            <h2 className="fw-bold text-center">An error occured.</h2>
            <p className="mb-1">Troubleshoot the ff:</p>
            <ul>
                <li>Check your internet connection.</li>
                <li>Check for typos: <b>ww.jessbaggs.com</b> instead of <b>www.jessbaggs.com</b></li>
                <li>Check console log.</li>
                <li>Check API endpoint.</li>
            </ul>
            <p className="mt-1">If problem still persists, please <a href="mailto:j.baggao@jessbaggs.com" className="link">contact administrator.</a></p>
        </div>
    </div>
    </>
  )
}

export default ErrorPage