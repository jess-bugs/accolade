import React from 'react'

const Content = ({children}) => {
  return (
    <div className='content min-vh-100 d-flex flex-column'>
        {children}
    </div>
  )
}

export default Content