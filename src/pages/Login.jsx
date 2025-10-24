import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { ImSpinner } from "react-icons/im";

import BrandLogo from '/src/assets/images/AccoladeLogo.webp';

import { IoPerson } from "react-icons/io5";
import { IoIosKey } from "react-icons/io";
import axios from 'axios';
import { motion } from "framer-motion";



const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dash/dashboard');
    }

  }, [])


  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginErr, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [animConfig, setAnimConfig] = useState({
    animate: {},
    transition: {},
  });

  const [submitted, setSubmitted] = useState(false);


  let submitLogin = (e) => {
    e.preventDefault();

    setSubmitted(true);

    const data = {
      username,
      password
    };

    axios.post('https://accoladeapi.jessbaggs.com/login', data)
      .then(response => {



        // if login fails...
        if (!response.data.success) {
          setLoginError(response.data.error);



          // shake animation
          setAnimConfig({
            animate: { x: [0, -8, 8, -8, 8, 0] },
            transition: { duration: 0.4, ease: "easeInOut" },
          });


          // reset shake animation
          setTimeout(() => {
            setAnimConfig({
              animate: {},
              transition: {},
            });
            setSubmitted(false);
          }, 500)


          return;
        }


        // if login success...
        if (response.data.success) {
          setLoginError('');
          setLoginSuccess(true);


          // store the token ID
          localStorage.setItem('token', response.data.tokenID);


          const delay = setTimeout(() => {
            navigate('/dash/dashboard');
            setSubmitted(false);
          }, 2000);


          return () => clearTimeout(delay);

        }
      })
      .catch(err => console.log('Request Error: ', err))

  }



  return (
    <>
      <div className="my-auto text-center">

        <img src={BrandLogo} style={{ height: '120px' }} alt="brand-logo" />
        <h2 className="fw-bold text-center">Admin Login</h2>
        {/* <NavLink to={'/dash/dashboard'} className={"btn btn-primary text-center"}>Login</NavLink> */}

        <div className="col-sm-6 mx-auto p-2 rounded-2">
          <form className="p-1 text-start" onSubmit={submitLogin}>

            {/* username */}
            <div className="mt-3 mb-3 col-xl-6 mx-auto">
              <p className="fs-5 mb-1">Username</p>
              <div className="input-group mb-3">
                <span className="input-group-text"><IoPerson /></span>
                <input onChange={(e) => setUsername(e.target.value)} required type="text" className="form-control form-control-sm" />
              </div>
            </div>

            {/* password */}
            <div className=" col-xl-6 mx-auto">
              <p className="fs-5">Password</p>
              <div className="input-group ">
                <span className="input-group-text" id="basic-addon1"><IoIosKey /></span>
                <input onChange={(e) => setPassword(e.target.value)} required type="password" className="form-control form-control-sm" />
              </div>

              {/* login error */}
              <div className="">
                {!loginSuccess && (
                  <motion.div
                    initial={{ x: 0 }}
                    animate={animConfig.animate}
                    transition={animConfig.transition}
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    <span style={{ fontSize: '13px' }} className={'text-danger'}>{loginErr}</span>
                  </motion.div>
                )}
              </div>



              {/* login success */}
              {loginSuccess && (
                <span className='text-success' style={{ fontSize: '12px' }}>Login success. Redirecting...

                  <div className="spinner-border spinner-border-sm text-success ms-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </span>
              )}

            </div>

            {/* Login Button */}
            <div className="my-4 col-xl-6 mx-auto d-grid">
              <button disabled={submitted} className="btn btn-sm btn-primary">Login</button>
            </div>

          </form>
        </div>
      </div>

    </>
  )
}

export default Login
