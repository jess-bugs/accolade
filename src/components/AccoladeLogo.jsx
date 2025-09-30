import React from 'react'
import BrandLogo from '../assets/images/AccoladeLogo.webp';

const AccoladeLogo = ({height}) => {
  return (
    <img src={BrandLogo} style={{height: height}} />
  )
}

export default AccoladeLogo