import React from 'react'
import BrandLogo from '../assets/images/WorkspaceLogo.png';


const WorkspaceLogo = ({height}) => {
  return (
    <>
    <img src={BrandLogo} style={{height: height}} />
    </>
  )
}

export default WorkspaceLogo