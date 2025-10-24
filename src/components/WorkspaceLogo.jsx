import React from 'react'
import BrandLogo from '../assets/images/AccoladeLogo.webp';


const WorkspaceLogo = ({height}) => {
  return (
    <>
    <img src={BrandLogo} style={{height: height}} />
    </>
  )
}

export default WorkspaceLogo