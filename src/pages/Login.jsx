import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <>
    <div className="my-auto text-center">
        <h2 className="fw-bold text-center">Login Page</h2>
        <NavLink to={'/dash/dashboard'}  className={"btn btn-primary text-center"}>Login</NavLink>
    </div>
    </>
  )
}

export default Login